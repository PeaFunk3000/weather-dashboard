console.log("Hello World!");

const myAPI = "5b86dd1981e818e717862cad25215448"


// Event listener for search button element
$("#search-button").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#search-input").val()
    cityName.toLowerCase();
    cityName[0].toUpperCase();
    console.log(cityName);

    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + myAPI;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(fiveDayForecast)

});

// 5 day forecast
function fiveDayForecast(response) {
    console.log(response);
    var lat = response[0].lat;
    var lon = response[0].lon;
    var theCity = response[0].name;
    console.log(theCity);

    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + myAPI;

    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(weatherResponse) {
    //     weatherResponse.cityName = theCity
    //     weatherResponse.cityLat = lat
    //     weatherResponse.cityLon = lon
    //     mapForecast(weatherResponse);
    // })
}

function getWeatherByLatLon (city, lat, lon) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + myAPI;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(weatherResponse) {
        weatherResponse.cityName = city
        weatherResponse.cityLat = lat
        weatherResponse.cityLon = lon
        mapForecast(weatherResponse);
    })
}


// mapForecast
function mapForecast(response) {
    console.log(response.cityName);
    console.log(response.cityLat);
    console.log(response.cityLon);
    console.log(response);
    console.log(response.list[0]);
    // present Temp (kelvin)
    console.log(response.list[0].main.temp);
    // present Humidity
    console.log(response.list[0].main.humidity);
    // present Wind speed (KPH)
    console.log(response.list[0].wind.speed);
    // present Weather Cond. (fa-icon)
    console.log(response.list[0].weather[0].description);
    var weatherToday = {
        temp: response.list[0].main.temp,
        humidity: response.list[0].main.humidity,
        windSpeed: response.list[0].wind.speed,
        weatherCond: response.list[0].weather[0].description,
    }
    console.log(weatherToday);

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
    console.log(fiveDayForecast);

    var cityForecast = {
        cityName: response.cityName,
        cityLat: response.cityLat,
        cityLon: response.cityLon,
        forecast: fiveDayForecast,
    }
}


function historyRecast () {
    localStorage.forEach(element => {
        element.
    });        
}













