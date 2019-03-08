// Initialize Firebase
var config = {
    apiKey: "AIzaSyA0sP7W2DMbg3ONof-iqBvD1CcuS_Gccss",
    authDomain: "project-1-c6935.firebaseapp.com",
    databaseURL: "https://project-1-c6935.firebaseio.com",
    projectId: "project-1-c6935",
    storageBucket: "project-1-c6935.appspot.com",
    messagingSenderId: "360342665991"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var city;
  var remove;
  var key;
  var cityclicked;
  var cityInput;
  var cityName;
  var citySaved;
  var divSum;
  var cities = [];
  var i = 0;
  var x;

  var cityInput = localStorage.getItem('city');
  cityName = cityInput.toLowerCase();
  
  
  $("#save-button").on("click", function(event) {
        console.log('CLICKED SUBMIT')
        event.preventDefault();

        var newCity = {
            name: cityName
        };

        database.ref().push(newCity);
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

        remove = document.createElement("button");
        remove.setAttribute("type", "submit");
        remove.setAttribute("name", "remove");
        remove.setAttribute("value", childSnapshot.key);
        remove.setAttribute('class', 'removeBtn btn btn-dark col-lg-2');
        remove.setAttribute('data-name', cities.indexOf(cityName));
        remove.innerHTML = "Remove";

        citySaved = document.createElement("div");
        citySaved.setAttribute("data-name", cityName);
        citySaved.setAttribute("class", "cityclicked col-lg-7");
        citySaved.innerText = cityName.toUpperCase(cityName);

        divSum = document.createElement("div");
        divSum.setAttribute("data-name", cityName);
        divSum.setAttribute("id", "city"+cities.indexOf(cityName));
        divSum.setAttribute("class", "row divSum");

        var td = $('<td>')

        
        var newRow = $("<tr>");
        td.append(citySaved, remove, divSum);
        newRow.append(td);
        console.log(newRow);
        console.log(citySaved);
       

        $("#tbody").append(newRow);

     });
     //Remove city from realtime database
    $(document).on("click", ".removeBtn", removeCity);

    function removeCity() {
        key = $(this).attr("value");
        x = $(this).attr("data-name");
        console.log('CLICKED REMOVE > removing...', key);
        database.ref().child(key).remove();
        console.log(x+1);
    }
     
    database.ref().on("child_removed", function(childSnapshot) {
        console.log("child removed >", childSnapshot.val());
        //Store updated city name from the database in a variable
        var cityName = childSnapshot.val().name;
        //cityName = cityName.toUpperCase();
        console.log(cityName);
        var element = document.getElementById('tableContainer')
        // element.deleteRow(x+1);
        cities = cities.filter(city => city != cityName);
        $("#tbody").empty();
        
        cities.forEach((city, index) => {
            remove = document.createElement("button");
            remove.setAttribute("type", "submit");
            remove.setAttribute("name", "remove");

            // remove.setAttribute("value", childSnapshot.key);
            remove.setAttribute('class', 'removeBtn btn btn-dark col-lg-2');
            remove.innerHTML = "Remove";
    
            citySaved = document.createElement("div");
            citySaved.setAttribute("data-name", city);
            citySaved.setAttribute("class", "cityclicked col-lg-7");
            citySaved.innerText = city.toUpperCase(city);
    
            divSum = document.createElement("div");
            divSum.setAttribute("data-name", city);
            divSum.setAttribute("id", "city" + index);
            divSum.setAttribute("class", "row divSum");
    
            var td = $('<td>')
            var newRow = $("<tr>");
            td.append(citySaved, remove, divSum);
            newRow.append(td);       
    
            $("#tbody").append(newRow);
    
            console.log(cities);
            console.log(element);
        });

     });


    //===========================================

     $(document).on("click", ".cityclicked", showCityInfo);

     function showCityInfo() {
        
        cityclicked = $(this).attr("data-name").trim();
        console.log("displaying carousel for city...", cityclicked);

        var cityIndex = cities.indexOf(cityclicked);

        var nestCarousel = $("<div class='car col-lg-8 mx-5 carousel slide' data-ride='carousel' id='carousel"+cityIndex+"'>");
        var nestWeather = $("<div class='col-lg-2 nestWeather' id='weather"+cityIndex+"'>");
        
        var carouselInner = $("<div class='carousel-inner'>");
        
       
        var keyPixabay = '11762581-0b67c578288018eeaa49bac14';
        var queryURL = 'https://pixabay.com/api/?key='+keyPixabay+'&q='+cityclicked+'&image_type=photo';

        $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(queryURL);
        console.log(response);
        results = response.hits;
        console.log(results.length);
        console.log(results);
        var credit = $("<cite class='car credit'>").html("<a href='https://pixabay.com/'>credit: Pixabay</a>");
        var creditDiv = $("<div class='car creditContainer'>");
        var divFirstPhoto = $("<div class='car photos carousel-item active'>")
        var firstPhoto = document.createElement("img");
        firstPhoto.setAttribute("src", response.hits[0].webformatURL);
        firstPhoto.setAttribute ("class", "car d-block w-100")
        firstPhoto.setAttribute("alt", "Photo of "+cityclicked);
        divFirstPhoto.append(firstPhoto, creditDiv);
        carouselInner.append(divFirstPhoto);
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
            var arrowPrevious = $("<a class='car carousel-control-prev' href='#carousel"+cityIndex+"' role='button' data-slide='prev'>");
            var span1 = $("<span class='car carousel-control-prev-icon' aria-hidden='true'>");
            var span2 = $("<span class='car sr-only'>Previous</span>");
            arrowPrevious.append(span1, span2);
            var arrowNext = $("<a class='car carousel-control-next' href='#carousel"+cityIndex+"' role='button' data-slide='next'>");
            var span3 = $("<span class='car carousel-control-next-icon' aria-hidden='true'>");
            var span4 = $("<span class=' car sr-only'>Next</span>");
            arrowNext.append(span3, span4);
            $("#carousel"+cityIndex).append(carouselInner, arrowPrevious, arrowNext);
            console.log(cityclicked);
    })


    //Weather
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

        // nestWeather = response.main.temp;
        var temp = Math.round(response.main.temp);
        var tempInfo = $("<p id='sumWeather'>Current temperature: "+temp+" Degrees F</p>")
        console.log(nestWeather);
        nestWeather.append(tempInfo);

})
document.getElementById("city"+cityIndex).style.border = "1px solid #cccccc";

var closeButton = $("<button type='button' class='close closeBtn' aria-label='Close' id='"+cityIndex+"'><span aria-hidden='true'>&times;</span></button>");


$("#city"+cityIndex).append(nestCarousel, nestWeather, closeButton);

$("#"+cityIndex).click(function() {
    $("#city"+cityIndex).slideUp(2000);
})
     }