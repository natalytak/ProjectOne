var results;
var cityInput = localStorage.getItem('city');
city = cityInput.toLowerCase();
console.log(cityInput);

    displayCarousel();

function displayCarousel() {
    if($(".allPhotos").hasClass("slick-slider")){
        $(".allPhotos").slick("unslick");
    }
    console.log(city);
    var keyPixabay = '11762581-0b67c578288018eeaa49bac14';
    var queryURL = 'https://pixabay.com/api/?key='+keyPixabay+'&q='+city+'&image_type=photo';

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
        $('.allPhotos').empty();
        for(var i = 0; i<results.length; i++) {
            var credit = $("<cite class='credit'>").html("<a href='https://pixabay.com/'>credit: Pixabay</a>");
            var creditDiv = $("<div class='creditContainer'>");   
            var divCityPhoto = $("<div class='photos'>");
            var cityPhoto = document.createElement("img");
            cityPhoto.setAttribute("src", response.hits[i].webformatURL);
            cityPhoto.setAttribute("class", "photos");
            creditDiv.append(credit);
            divCityPhoto.append(cityPhoto, creditDiv);
            $(".allPhotos").append(divCityPhoto);
    
        }
        buildCarousel();
    })
}
function buildCarousel() {
    $('.allPhotos').slick({
            dots: true,
            infinite: true,
            speed: 400,
            slidesToShow: 3,
            centerMode: true,
            variableWidth: true  
        });
}