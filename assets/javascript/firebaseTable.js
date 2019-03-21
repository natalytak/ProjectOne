// Initialize Firebase projectfinal
  var config = {
    apiKey: "AIzaSyC9xGDjQ6ycmx4eS9OdaLeQ-2FX1jQSN1c",
    authDomain: "project1-city-seer.firebaseapp.com",
    databaseURL: "https://project1-city-seer.firebaseio.com",
    projectId: "project1-city-seer",
    storageBucket: "project1-city-seer.appspot.com",
    messagingSenderId: "651225284485"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var city;
  var remove;
  var key;
  var cityclicked;
  var cityclickedId;
  var cityInput;
  var cityName;
  var citySaved;
  var divSum;
  var cities = [];
  
  
  //Making city search input avaialble in case user wants to save it
  var cityInput = localStorage.getItem('city');
  cityName = cityInput.toLowerCase();
  
  
  //SAVE THE CITY and place it in firebase and in a table row with elements to later remove or show more info
  $("#save-button").on("click", function(event) {
        console.log('CLICKED SUBMIT')
        event.preventDefault();

        var newCity = {
            name: cityName
        };
        console.log(cityName)

        database.ref().push(newCity);
        console.log(cities);
        console.log(newCity.name);
   
        alert("City successfully added");

    });

        database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
        //Store updated city name from the database in a variable
        var cityName = childSnapshot.val().name;
        console.log(cityName);
        cities.push(cityName);
        console.log(cities);
        console.log("child added with key => ", childSnapshot.key)
        
        //Prepare a variable to be used as attribute to link button, clicked elements and rows
        var id = cityName.replace(/\s/g,''); 
        
        //Create the remove buttons for each saved city and set attributes
        remove = document.createElement("button");
        remove.setAttribute("type", "submit");
        remove.setAttribute("name", "remove");
        //Use key of database as attribute to remove the right city from database
        remove.setAttribute("value", childSnapshot.key);
        remove.setAttribute('class', 'removeBtn btn btn-dark col-lg-2');
        remove.setAttribute('data-name', id);
        remove.innerHTML = "Remove";

        //Create a div to hold the city saved name and set attributes
        citySaved = document.createElement("div");
        citySaved.setAttribute("data-name", id);
        citySaved.setAttribute("value", cityName);
        citySaved.setAttribute("class", "cityclicked col-lg-7");
        citySaved.innerText = cityName.toUpperCase(cityName);

        //Create a div that will show city information when the user clicks the city saved
        divSum = document.createElement("div");
        divSum.setAttribute("data-name", cityName);
        divSum.setAttribute("id", "city"+id);
        divSum.setAttribute("class", "row divSum");
        
        //Create a "td" that will hold the data in the table
        var td = document.createElement("td");

        //Create a row to hold each city and its elements (remove button, name, div info)
        var newRow = document.createElement("tr");
        newRow.setAttribute("id", "row"+id);
        //Append all elements of the saved city to the td
        td.append(citySaved, remove, divSum);
        //Append the td to its row
        newRow.append(td);

       
        //Append the new row to the table's body
        $("#tbody").append(newRow);
     });

    //REMOVE CITY from realtime database by clicking remove button
    $(document).on("click", ".removeBtn", removeCity);

    function removeCity() {
        //Remove data by its key that was set up as attribute of that remove button
        key = $(this).attr("value");
        console.log('CLICKED REMOVE > removing...', key);
        database.ref().child(key).remove();
    }
     
    database.ref().on("child_removed", function(childSnapshot) {
        console.log("child removed >", childSnapshot.val());
        //Store updated city name from the database in a variable
        var cityNameRemoved = childSnapshot.val().name;
        console.log(cityNameRemoved);
        //Get the name of the removed city and remove spaces in order to use as part of id and remove the right city
        var idRemoved = cityNameRemoved.replace(/\s/g,''); 
        //Remove the city/row and its elements from the DOM
        $("#row"+idRemoved).empty();
        $("#row"+idRemoved).remove();
     
        
        cities.splice(cities.indexOf(cityNameRemoved), 1);
        console.log(cities);
     });

    //===========================================

    // Click city name to VIEW MORE INFORMATION
     $(document).on("click", ".cityclicked", showCityInfo);

     function showCityInfo() {
        
        cityclickedId = $(this).attr("data-name");
        cityclicked = $(this).attr("value");
        console.log("displaying carousel for city...", cityclicked);

        //Create pictures carousel elements using bootstrap classes
        var nestCarousel = $("<div class='car col-lg-8 mx-5 carousel slide' data-ride='carousel' id='carousel"+cityclickedId+"'>");
        var nestWeather = $("<div class='col-lg-2 nestWeather' id='weather"+cityclickedId+"'>");
        
        var carouselInner = $("<div class='carousel-inner'>");
        
        //TO BUILD THE CAROUSEL GET IMAGES OF CLICKED CITY FROM PIXABAY API
        //Store Pixabay API key and url in variables
        var keyPixabay = '11762581-0b67c578288018eeaa49bac14';
        var queryURL = 'https://pixabay.com/api/?key='+keyPixabay+'&q='+cityclicked+'&image_type=photo';

        $.ajax({
        url: queryURL,
        method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        console.log(queryURL);
        console.log(response);
        results = response.hits;
        console.log(results.length);
        console.log(results);
        var credit = $("<cite class='car credit'>").html("<a href='https://pixabay.com/'>credit: Pixabay</a>");
        var creditDiv = $("<div class='car creditContainer'>");
        //Following bootstrap guide choose 1st picture of carousel from API object and append to created html elements
        var divFirstPhoto = $("<div class='car photos carousel-item active'>")
        var firstPhoto = document.createElement("img");
        firstPhoto.setAttribute("src", response.hits[0].webformatURL);
        firstPhoto.setAttribute ("class", "car d-block w-100")
        firstPhoto.setAttribute("alt", "Photo of "+cityclicked);
        divFirstPhoto.append(firstPhoto, creditDiv);
        carouselInner.append(divFirstPhoto);
        //Through the array of pictures from API, create html elements of carousel and append pictures
        for(var i = 1; i<results.length; i++) {
            console.log("city image", results[i])
            var divCityPhoto = $("<div class='car photos carousel-item'>")
            var cityPhoto = document.createElement("img");
            cityPhoto.setAttribute("src", response.hits[i].webformatURL);
            cityPhoto.setAttribute("alt", "Photo of "+cityclicked);
            cityPhoto.setAttribute ("class", "car d-block w-100")
            creditDiv.append(credit);
            divCityPhoto.append(cityPhoto, creditDiv);
            carouselInner.append(divCityPhoto);
        }
            var arrowPrevious = $("<a class='car carousel-control-prev' href='#carousel"+cityclickedId+"' role='button' data-slide='prev'>");
            var span1 = $("<span class='car carousel-control-prev-icon' aria-hidden='true'>");
            var span2 = $("<span class='car sr-only'>Previous</span>");
            arrowPrevious.append(span1, span2);
            var arrowNext = $("<a class='car carousel-control-next' href='#carousel"+cityclickedId+"' role='button' data-slide='next'>"); 
            var span3 = $("<span class='car carousel-control-next-icon' aria-hidden='true'>");
            var span4 = $("<span class=' car sr-only'>Next</span>");
            arrowNext.append(span3, span4);
            $("#carousel"+cityclickedId).append(carouselInner, arrowPrevious, arrowNext);
  
    })


    //Weather API of clicked city in the table
    var APIKey = "d005904012d9e0bf8b7c2ed1addb11e2";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityclicked+"&units=imperial&appid=d005904012d9e0bf8b7c2ed1addb11e2";

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        var temp = Math.round(response.main.temp);
        var tempInfo = $("<p id='sumWeather'>Current Temperature: "+temp+" Degrees F</p>")
        console.log(nestWeather);
        nestWeather.append(tempInfo);

});
//Style the window that will be open with carousel and weather information
document.getElementById("city"+cityclickedId).style.border = "1px solid #cccccc";

//Create a button to close the information window
var closeButton = $("<button type='button' data-name='"+cityclickedId+"' class='close closeBtn' aria-label='Close' id='close"+cityclickedId+"'><span aria-hidden='true'>&times;</span></button>");

//Append carousel and weather info and close button to the div/information window
$("#city"+cityclickedId).append(nestCarousel, nestWeather, closeButton);

$(document).on("click", ".closeBtn", closewindow);

  function closewindow() {
    var close = $(this).attr("data-name");
    $("#city"+close).slideUp(1000);
  }
}


