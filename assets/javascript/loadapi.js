// call the 'city' attribute from LocalStorage and create the cityInput attribute
var cityInput = localStorage.getItem('city');

console.log(cityInput);

// create weather api call query variable which includes the dynamic cityInput 
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityInput +
  "&units=imperial&APIKEY=d3100d1c4df5ca0bc479a80c96bf0ccf";

console.log(queryURL);

// weather api ajax call request and response logic
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

  var results = response;

  // add temperature to currentWeather div element on UI, rounding temp using Math.round function because temp value come back with two decimal places by default
  var roundedTemp = Math.round(results.main.temp);
  var currentTemp = $("<div>").text("Weather: " + roundedTemp + "\xB0F");

  // add temperature and city values to menu UI
  $("#currentCityID").prepend(cityInput);
  $("#currentWeather").prepend(currentTemp);
});

///////Natasha's city image API call/////

var pixabayUrl = "https://pixabay.com/api/?key=11801190-0ca7f6e1ad42b7ceca325ed29&q=" + cityInput + "&image_type=photo";
   $.ajax({
      url: pixabayUrl,
      method: 'GET',
      dataType: 'json',
   }).then(function(response){
      console.log(response);
      var mainImage = response.hits[0].largeImageURL;
      console.log(mainImage);
      $("#imageUrl").append('<img id="overviewImg" src=" ' + mainImage + '" style="width:100%;height:auto"><br>');
  
    })

////////Natasha's attractions API call///

console.log(cityInput);

    var attractionsUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=tourist-attractions&location=" + cityInput + "&sort_by=rating&limit=5";
         
    callYelp(attractionsUrl);

    function callYelp(url) {
        $.ajax({
        url: url,
        headers: {
            'Authorization':'Bearer Au7m4nDqL-00aHxQfbN4GeJ5qgQt2vYmx5YKf8YnjYdCD74P8hgMf8lrFqQY1Z0HJx-Nr_2gqIF3rNh98_q4J5yFjlPoOvXLU7HDDhDVtYuJI08MLF--YeR5xYx4XHYx',
            }, 
        method: 'GET',
        dataType: 'json',
        success: function(data){
          $('#topAttractions').empty();
            console.log(data);
                // Itirate through the JSON array of 'businesses' which was returned by the API
                $.each(data.businesses, function(i, item) {
                // Store each business's object in a variable
                var id = item.id;
                var name = item.name;
                var image = item.image_url;
                var rating = item.rating;
                var address = item.location.display_address;
                var businessesURL = item.url;
                // Append our result into our page
                var businessesDiv = $('<div class="attractions">');
                businessesDiv.append('<div id="' + id + '" style="margin-top:5px;margin-bottom:5px;">');
                businessesDiv.append('<img id="attractionImage" src="' + image + '" style="width:100%;height:auto;"><br>');
                businessesDiv.append('<b id="name">' + name + '</b><br>');
                businessesDiv.append('<b>Rating: </b>' + rating + '<br>');
                businessesDiv.append('<b>Address: </b>' + address + '<br>');
                businessesDiv.append('<button class="btn btn-secondary" id="details"><a target="_blank" href="' + businessesURL + '">Details</a></button><br>');    
                $('#topAttractions').prepend(businessesDiv);
              });
            }
        });      
    }

////////Natasha's events API call///////

var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?location=" + cityInput + "&sort_on=popularity&categories=music&limit=10";

$.ajax({
 url: myurl,
 headers: {
  'Authorization':'Bearer Au7m4nDqL-00aHxQfbN4GeJ5qgQt2vYmx5YKf8YnjYdCD74P8hgMf8lrFqQY1Z0HJx-Nr_2gqIF3rNh98_q4J5yFjlPoOvXLU7HDDhDVtYuJI08MLF--YeR5xYx4XHYx',
},
//      
 method: 'GET',
 dataType: 'json',
success: function(data){
  $("#topEvents").empty();
  console.log(data);
  // Itirate through the JSON array of 'businesses' which was returned by the API
    $.each(data.events, function(i, item) {
      // Store each event's object in a variable
      var id = item.id;
      var attending = item.attending_count;
      var image = item.image_url;
      var name = item.name;
      // change the date format with moment.js
      var timeStart = moment(item.time_start).format('MMMM Do');
      var description = item.description;
      var address = item.location.display_address;
      var eventURL = item.event_site_url;
      // Append our result into our page
      var eventsDiv = $('<div class="events">');
      
      eventsDiv.append('<div id="' + id + '" style="margin-top:5px;margin-bottom:5px;">');
      eventsDiv.append('<img id="#eventImage" src="' + image + '" style="width:100%;height:250px;float:left"><br>');
      eventsDiv.append('<b id="name">' + name + '</b><br>');
      eventsDiv.append(description + '<br>');
      eventsDiv.append('<b>Attending: </b>' + attending + '<br>');
      eventsDiv.append('<b>Address: </b>' + address + '<br>');
      eventsDiv.append('<b>Date: </b>' + timeStart + '<br>')
      eventsDiv.append('<button class="btn btn-secondary" id="details"><a target="_blank" href="' + eventURL + '">Details</a></button><br>');
      
      $("#topEvents").prepend(eventsDiv);
    });
  }
});      

///////Natasha's overview API call/////

   var myurl = "https://secure.geonames.org/wikipediaSearchJSON?q=" + cityInput + "&minRows=20&username=natka";
   $.ajax({
      url: myurl,
      method: 'GET',
      dataType: 'json',
   }).then(function(response){
      console.log(response);
      var overview = response.geonames[0].summary;
      console.log(overview);
      var link = response.geonames[0].wikipediaUrl;
      $("#cityOverview").append(overview + '<button class="btn btn-secondary" id="details" style="background-color:#8c734b,padding:8px40px,margin:10px"><a target="_blank" href="https://' + link + '">Read More</a></button><br>');
  })
  
      
