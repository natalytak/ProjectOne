// storing city as local variable

// adding weather API call

$("#citySearchBtn").on("click", function() {
    
event.preventDefault();

var cityInput = $(this).attr("userInputCity");
var cityInput = $("#userInputCity").val().trim();

console.log(cityInput);

localStorage.setItem('city', cityInput);

location.href = "overview.html";
})
