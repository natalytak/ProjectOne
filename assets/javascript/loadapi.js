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
  var currentTemp = $("<div>").text("Weather: " + roundedTemp + " Degrees F");

  // add temperature and city values to menu UI
  $("#currentCityID").prepend(cityInput);
  $("#currentWeather").prepend(currentTemp);
});
