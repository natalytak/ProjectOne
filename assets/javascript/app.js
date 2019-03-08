$(document).ready(function(){

  // transition style functions & variables
  var $overviewImage = $(".overview-image");
    $overviewImage.waypoint(function() {
    $overviewImage.addClass("overview-image-waypoint");
    }, { offset: "50%"});


    var $attractionsImage = $(".attractions-image");
    $attractionsImage.waypoint(function() {
    $attractionsImage.addClass("attractions-image-waypoint");
    }, { offset: "50%"});

    var $newsImage = $(".news-image");
    $newsImage.waypoint(function() {
    $newsImage.addClass("news-image-waypoint");
    }, { offset: "50%"});

    var $aboutUsStyle = $(".about-us-fade")
    $aboutUsStyle.waypoint(function() {
    $aboutUsStyle.addClass("about-us-fade-waypoint");
    }, { offset: "70%"});

    var $theTeamStyle = $(".the-team-title-style")
    $theTeamStyle.waypoint(function() {
    $theTeamStyle.addClass("the-team-title-style-waypoint");
    }, { offset: "70%"});

    var $theTeamStyleGroupOne = $(".the-team-style-group-one")
    $theTeamStyleGroupOne.waypoint(function() {
    $theTeamStyleGroupOne.addClass("the-team-style-group-one-waypoint");
    }, { offset: "70%"});

    var $theTeamStyleGroupTwo = $(".the-team-style-group-two")
    $theTeamStyleGroupTwo.waypoint(function() {
    $theTeamStyleGroupTwo.addClass("the-team-style-group-two-waypoint");
    }, { offset: "70%"});

    var $theTeamStyleGroupThree = $(".the-team-style-group-three")
    $theTeamStyleGroupThree.waypoint(function() {
    $theTeamStyleGroupThree.addClass("the-team-style-group-three-waypoint");
    }, { offset: "70%"});
    
    // end transition


    // dropdown button array
    var stateList= [{name: "Alabama", shortName: "AL"}, {name: "Arkansas"}, {name: "Arizona"}, {name: "California"}, {name:"Colorado"}, {name: "Connecticut"},{name:"Delaware"}, {name: "Florida"}, {name: "Georgia"}, {name: "Hawaii"}, {name: "Idaho"}, {name: "Illinois"}, {name: "Indiana"}, {name: "Iowa"}, {name:"Kansas"}, {name: "Kentucky"}, {name: "Lousiana"}, {name: "Maine"}, {name: "Maryland"}, {name: "Massachusetts"}, {name: "Michigan"}, {name: "Minnesota"}, {name: "Missippi"}, {name: "Missouri"}, {name: "Montana"}, {name: "Nebraska"}, {name: "Nevada"}, {name: "New Hampshire"}, {name: "New Jersey"}, {name: "New Mexico"}, {name: "New York"}, {name: "North Carolina"}, {name: "North Dakota"}, {name: "Ohio"}, {name: "Oklahoma"}, {name: "Oregon"}, {name: "Pennsylvania"}, {name: "Rhode Island"}, {name: "South Carolina"}, {name: "South Dakota"}, {name: "Tennessee"}, {name: "Texas"}, {name: "Utah"}, {name: "Vermont"}, {name: "Virginia"}, {name: "Washington"}, {name: "West Virginia"}, {name: "Wisconsin"}, {name: "Wyoming"}];
    
    for (var i = 0; i < stateList.length; i++) {
        $(".dropdown-menu").append('<option class="dropdown-item" href="#" value="' + stateList[i].name + '">' + stateList[i].name + '</option>');
        $(".dropdown-menu option").click( function() {
            var selectedState = $(this).text();
              $("#dropdownMenuButton").text(selectedState);
        });
    };
    

    // form validation
    $('.form-control').on('keypress', function(e) {
      var regex = new RegExp("^[a-zA-Z ]*$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
         return true;
      }
      e.preventDefault();
      return false;
     });


    //  user city input value
     $("#citySearchBtn").on("click", function() {
    
      event.preventDefault();
      
      var cityInput = $(this).attr("userInputCity");
      var cityInput = $("#userInputCity").val().trim();
      
      console.log(cityInput);
      
      localStorage.setItem("city", cityInput);
      
      location.href = "overview.html";
      });




      // feeling spontaneous button
    var randomCityList = ["Las Vegas", "Philadelphia", "Chicago", "Nashville", "Miami", "Denver", "Anchorage", "Honolulu", "Los Angeles", "Boston"];

    $("#randomCityButton").on("click", function() {
    
      event.preventDefault();
      
      var cityInput = randomCityList[Math.floor(Math.random() * randomCityList.length)];
      
      console.log(cityInput);
      
      localStorage.setItem("city", cityInput);
      
      location.href = "overview.html";
      });
    
    });


