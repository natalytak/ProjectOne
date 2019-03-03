// create on.click function which stores the city input as local variable for use by subsequent pages and also calls the overview.html and the citySearchBtn is clicked

$("#citySearchBtn").on("click", function() {
    
event.preventDefault();

// create cityInput variable based on user input
var cityInput = $(this).attr("userInputCity");
var cityInput = $("#userInputCity").val().trim();

console.log(cityInput);

// store cityInput variablelocally for use by subsequent pages
localStorage.setItem('city', cityInput);

// target overview.html page when the citySearchBtn is clicked
location.href = "overview.html";
})
