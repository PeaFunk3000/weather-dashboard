console.log("Hello World!");

// API call 5-day-weather
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


// API call co-ords for location name
// api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// my API key 5b86dd1981e818e717862cad25215448
var myAPI = "5b86dd1981e818e717862cad25215448"
// --------------------------------------------------------------------------------------------

// Event listener for search button element
$("#search-button").on("click", function() {
    var cityName = $("#search-input").val()
    console.log(cityName);

    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + myAPI

})


// var cityName = "London";
// var limit = 5;
// var stateCode;
// var countryCode;

// var lat;
// var lon;


// var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + myAPI
// var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + myAPI


// AJAX call
$.ajax({
    url: locationURL,
    method: "GET"
  }).then(function(response){
    console.log(response);

  });