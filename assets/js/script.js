console.log("Hello World!");

// API call 5-day-weather
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


// API call co-ords for location name
// api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// my API key 5b86dd1981e818e717862cad25215448
const myAPI = "5b86dd1981e818e717862cad25215448"
// --------------------------------------------------------------------------------------------

var cityName = $("#search-input").val()

// Event listener for search button element
$("#search-button").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#search-input").val()
    console.log(cityName);
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + myAPI ;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
        fiveDayForecast(response[0].lat, response[0].lon);
      });   
})

function fiveDayForecast(lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + myAPI
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
        console.log(response.city.name);
        var today = $("<div>");
        today.addClass("today");
        var todayH2 = $("<h2>");
        todayH2.text(response.city.name);
        today.append(todayH2);
        $("#today").append(today);
})}