console.log("Hello World!");

const myAPI = "5b86dd1981e818e717862cad25215448"
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
      }).then(fiveDayForecast)
      });   

function fiveDayForecast(response) {
    console.log(response);
    var lat = response[0].lat;
    var lon = response[0].lon;
    var today = $("<div>");
        today.addClass("today");
        var todayH2 = $("<h2>");
        var historyBtn = $("<button>");
        todayH2.text(response[0].name);
        today.append(todayH2);
        $("#today").append(today);
        historyBtn.addClass("historyBtn");
        historyBtn.text(response[0].name);
        $("#history").prepend(historyBtn);


    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + myAPI ;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
        // grab date from response
        var dateArr = response.list[0].dt_txt.split(' ')
        console.log(dateArr);

        var theDate = moment(dateArr[0]).format("D/M/YYYY");
        todayH2.append( "" + "(" + theDate + ")");
        
})}