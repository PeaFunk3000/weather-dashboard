
const myAPI = "5b86dd1981e818e717862cad25215448"

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

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + myAPI;

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
    // var weatherToday = {
    //     temp: response.list[0].main.temp,
    //     humidity: response.list[0].main.humidity,
    //     windSpeed: response.list[0].wind.speed,
    //     weatherCond: response.list[0].weather[0].description,
    // }

    var fiveDayForecast = [];

    for (let i = 0; i < response.list.length; i = i + 8) {
        var day = {
            temp: response.list[i].main.temp,
            humidity: response.list[i].main.humidity,
            windSpeed: response.list[i].wind.speed,
            weatherCond: response.list[i].weather[0].description,
        }
        fiveDayForecast.push(day);
    }

    var cityForecast = {
        cityName: response.cityName,
        cityLat: response.cityLat,
        cityLon: response.cityLon,
        forecast: fiveDayForecast,
    }
    localStorage.setItem(response.cityName, JSON.stringify(cityForecast));
}


function historyRecast() {
    var storage = Object.keys(localStorage);
    storage.forEach(element => {
        var parsedStore = JSON.parse((localStorage.getItem(element)))
        getWeatherByLatLon(parsedStore.cityName, parsedStore.cityLat, parsedStore.cityLon);
    });
}

















