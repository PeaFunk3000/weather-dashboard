
const myAPI = "5b86dd1981e818e717862cad25215448"

var historyDiv = $("#history");
var displayToday = $("#today");
var displayForecast = $("#forecast");


// Event listener for search button element
$("#search-button").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#search-input").val()
    cityName.toLowerCase();
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

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + myAPI;

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
    var weatherToday = {
        name: response.cityName,
        date: response.list[0].dt,
        temp: response.list[0].main.temp,
        humidity: response.list[0].main.humidity,
        windSpeed: response.list[0].wind.speed,
        weatherCond: response.list[0].weather[0].description,
    }
    displayToday.html(`<h1> ${weatherToday.name} ${new Date(weatherToday.date * 1000).toLocaleDateString('en-GB', { weekday: 'long' })} </h1>
    <img src = "http://openweathermap.org/img/wn/10d@2x.png"/>
    <p>Temp: ${weatherToday.temp} \u00B0 C </p>
    <p>Wind: ${weatherToday.windSpeed} KPH </p>
    <p>Humitity: ${weatherToday.humidity} % </p>`)



    for (let i = 8; i < response.list.length; i = i + 8) {
        var day = {
            name: response.cityName,
            date: response.list[i].dt,
            temp: response.list[i].main.temp,
            humidity: response.list[i].main.humidity,
            windSpeed: response.list[i].wind.speed,
            weatherCond: response.list[i].weather[0].description,
        }
        console.log(day);
        var dayDiv = $("<div>")
        dayDiv.addClass("forecast")
        dayDiv.html(`<h2> ${new Date(day.date * 1000).toLocaleDateString('en-GB', { weekday: 'long' })} </h1>
    <img src = "http://openweathermap.org/img/wn/10d@2x.png"/>
    <p>Temp: ${day.temp} \u00B0 C </p>
    <p>Wind: ${day.windSpeed} KPH </p>
    <p>Humitity: ${day.humidity} % </p>`)
    displayForecast.append(dayDiv);

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
            getWeatherByLatLon(parsedStore.cityName, parsedStore.cityLat, parsedStore.cityLon)
        })
        historyDiv.append(historyBtn);
    });
}

populateHistory();





















