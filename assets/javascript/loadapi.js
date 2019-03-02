var cityInput = localStorage.getItem('city');

console.log(cityInput);

var queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  cityInput +
  "&units=imperial&APIKEY=d3100d1c4df5ca0bc479a80c96bf0ccf";

console.log(queryURL);

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

  var results = response;

  // adding temperature to currentWeather div element on UI
  var roundedTemp = Math.round(results.main.temp);
  var currentTemp = $("<div>").text(roundedTemp + " Degrees F");

  $("#currentWeather").prepend(currentTemp);
});
