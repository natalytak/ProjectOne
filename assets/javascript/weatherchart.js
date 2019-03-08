var cityInput = localStorage.getItem("city");
// setting api query variable
var queryURL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Chicago&units=imperial&APIKEY=d3100d1c4df5ca0bc479a80c96bf0ccf";

console.log(queryURL);

// forecast weather api ajax call request and response logic

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

  var results = response.list;

  // create for loop which loops through results and creates array of weather data objects tomorrow's weather

  var weatherForecastData = [];

  for (i = 0; i < 8; i++) {
    weatherForecastData.push({
      time: moment.utc(results[i].dt_txt).local().format("h A"),
      weather: results[i].main.temp
    });
  }

  console.log(weatherForecastData);

  var weatherTimeOfDay = [];
  var weatherTemp = [];
  for (var i = 0; i < weatherForecastData.length; i++) {
    weatherTimeOfDay.push(weatherForecastData[i].time);
    weatherTemp.push(weatherForecastData[i].weather);
  }
  console.log(weatherTimeOfDay);
  console.log(weatherTemp);

  // create chart to plot date and weather variables

  var weatherChart = document.getElementById("weather-chart").getContext("2d");
  var myChart = new Chart(weatherChart, {
    type: "bar",
    responsive: true,
    data: {
      labels: weatherTimeOfDay,
      datasets: [
        {
          label: cityInput + " 24 Hour Forecast (\xB0F)",
          data: weatherTemp,
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)"
          ],
          borderWidth: 4
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Temperature (\xB0F)"
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Time of Day"
            }
          }
        ]
      },
      padding: {
        left: 20,
        right: 20,
        top: 10,
        bottom: 10
      },
      labels: {
        defaultFontColor: "#666"
      }
    }
  });
});
