$(document).ready(function(){

    $(".fade-images").hide();
    $(window).scroll(function() {
        $(".fade-images").css( "display", "inline" ).fadeIn("slow");
      });


    var stateList= [{name: "Alabama", shortName: "AL"}, {name: "Arkansas"}, {name: "Arizona"}, {name: "California"}, {name:"Colorado"}, {name: "Connecticut"},{name:"Delaware"}, {name: "Florida"}, {name: "Georgia"}, {name: "Hawaii"}, {name: "Idaho"}, {name: "Illinois"}, {name: "Indiana"}, {name: "Iowa"}, {name:"Kansas"}, {name: "Kentucky"}, {name: "Lousiana"}, {name: "Maine"}, {name: "Maryland"}, {name: "Massachusetts"}, {name: "Michigan"}, {name: "Minnesota"}, {name: "Missippi"}, {name: "Missouri"}, {name: "Montana"}, {name: "Nebraska"}, {name: "Nevada"}, {name: "New Hampshire"}, {name: "New Jersey"}, {name: "New Mexico"}, {name: "New York"}, {name: "North Carolina"}, {name: "North Dakota"}, {name: "Ohio"}, {name: "Oklahoma"}, {name: "Oregon"}, {name: "Pennsylvania"}, {name: "Rhode Island"}, {name: "South Carolina"}, {name: "South Dakota"}, {name: "Tennessee"}, {name: "Texas"}, {name: "Utah"}, {name: "Vermont"}, {name: "Virginia"}, {name: "Washington"}, {name: "West Virginia"}, {name: "Wisconsin"}, {name: "Wyoming"}];
    
    for (var i = 0; i < stateList.length; i++) {
        $(".dropdown-menu").append('<option class="dropdown-item" href="#" value="' + stateList[i].name + '">' + stateList[i].name + '</option>');
        $(".dropdown-menu option").click( function() {
            var selectedState = $(this).text();
              $("#dropdownMenuButton").text(selectedState);
        });
    };



    $('.form-control').on('keypress', function(e) {
      var regex = new RegExp("^[a-zA-Z ]*$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
         return true;
      }
      e.preventDefault();
      return false;
     });



     $("#citySearchBtn").on("click", function() {
    
      event.preventDefault();
      
      var cityInput = $(this).attr("userInputCity");
      var cityInput = $("#userInputCity").val().trim();
      
      console.log(cityInput);
      
      localStorage.setItem('city', cityInput);
      
      location.href = "overview.html";
      })




    
    });


