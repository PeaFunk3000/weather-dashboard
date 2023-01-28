
const myAPI = "5b86dd1981e818e717862cad25215448"

var historyDiv = $("#history")


// Event listener for search button element
$("#search-button").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#search-input").val()
    cityName.toLowerCase();
    cityName[0].toUpperCase();

    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + myAPI;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(fiveDayForecast)
});

// 5 day forecast
function fiveDayForecast(response) {

    var lat = response[0].lat;
    var lon = response[0].lon;
    var theCity = response[0].name;
    getWeatherByLatLon(theCity, lat, lon);
}

function getWeatherByLatLon(city, lat, lon) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + myAPI;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (weatherResponse) {
        weatherResponse.cityName = city
        weatherResponse.cityLat = lat
        weatherResponse.cityLon = lon
        mapForecast(weatherResponse);
    })
}


// mapForecast
function mapForecast(response) {
    console.log(response);
    // var weatherToday = {
    //     temp: response.list[0].main.temp,
    //     humidity: response.list[0].main.humidity,
    //     windSpeed: response.list[0].wind.speed,
    //     weatherCond: response.list[0].weather[0].description,
    // }



    for (let i = 0; i < response.list.length; i = i + 8) {
        var day = {
            date: response.list[i].dt,
            temp: response.list[i].main.temp,
            humidity: response.list[i].main.humidity,
            windSpeed: response.list[i].wind.speed,
            weatherCond: response.list[i].weather[0].description,
        }
       //create the html
        
    }



    var cityForecast = {
        cityName: response.cityName,
        cityLat: response.cityLat,
        cityLon: response.cityLon,
        // forecast: fiveDayForecast,
    }
    localStorage.setItem(response.cityName, JSON.stringify(cityForecast));
}

//  history btn recall
// function historyRecast() {
//     var storage = Object.keys(localStorage);
//     storage.forEach(element => {
//         var parsedStore = JSON.parse((localStorage.getItem(element)))
//         getWeatherByLatLon(parsedStore.cityName, parsedStore.cityLat, parsedStore.cityLon);
//     });
// }

// Func to pop HTML
function populateHistory() {
    historyDiv.empty();
    var storage = Object.keys(localStorage);
    storage.forEach(element => {
        var parsedStore = JSON.parse((localStorage.getItem(element)))
        var historyBtn = $("<button>");
        historyBtn.text(parsedStore.cityName);
        historyBtn.on("click", function (event) {
            console.log(event);
            getWeatherByLatLon(parsedStore.cityName, parsedStore.cityLat, parsedStore.cityLon)
        })
        historyDiv.append(historyBtn);
    });
}

populateHistory();




    
















