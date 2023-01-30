
const myAPI = "5b86dd1981e818e717862cad25215448"

var historyDiv = $("#history");
var displayToday = $("#today");
var displayForecast = $("#forecast");

window.addEventListener("load", populateHistory);


// Event listener for search button element
$("#search-button").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#search-input").val()
    cityName.toLowerCase();
    // First AJAX API call for geo tag - lat lon using cityName
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + myAPI;
    $.ajax({
        url: queryURL,
        method: "GET"
        // then call five day forecast with response
    }).then(fiveDayForecast)
});

// 5 day forecast
function fiveDayForecast(response) {
    // store theCity, lat and lon, pass these into getWeatherbyLatLon
    var lat = response[0].lat;
    var lon = response[0].lon;
    var theCity = response[0].name;
    getWeatherByLatLon(theCity, lat, lon);
}

// get weather forecast using city, lat, lon
function getWeatherByLatLon(city, lat, lon) {

    // AJAX API call for weather data using city lat and lon
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + myAPI;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (weatherResponse) {
        // carry city, lat and lon parameters into mapForecast func by defining new response cityName, cityLat, cityLon
        weatherResponse.cityName = city
        weatherResponse.cityLat = lat
        weatherResponse.cityLon = lon
        mapForecast(weatherResponse);
    })
}


// mapForecast to dynamically map HTML
function mapForecast(response) {
    console.log(response);
    displayToday.empty();
    displayForecast.empty();
    // weatherToday defined, dynamically displayed in displayToday
    var weatherToday = {
        name: response.cityName,
        date: response.list[0].dt,
        temp: response.list[0].main.temp,
        humidity: response.list[0].main.humidity,
        windSpeed: response.list[0].wind.speed,
        weatherCond: response.list[0].weather[0].description,
    }
    displayToday.html(`<h1> ${weatherToday.name} </h1> 
    <h2>${new Date(weatherToday.date * 1000).toLocaleDateString('en-GB', { weekday: 'long' })} </h2>
    <img src = "http://openweathermap.org/img/wn/10d@2x.png"/>
    <p>Temp: ${weatherToday.temp} \u00B0 C </p>
    <p>Wind: ${weatherToday.windSpeed} KPH </p>
    <p>Humitity: ${weatherToday.humidity} % </p>`)
    displayToday.addClass("today-now");


    // each 5 day forecast day defined, dynamically displayed in displayForecast under new dayDiv
    for (let i = 7; i < response.list.length; i = i + 8) {
        var day = {
            name: response.cityName,
            date: response.list[i].dt,
            temp: response.list[i].main.temp,
            humidity: response.list[i].main.humidity,
            windSpeed: response.list[i].wind.speed,
            weatherCond: response.list[i].weather[0].description,
            weatherIcon: response.list[i].weather[0].icon,
        }
        console.log(day);
        var dayDiv = $("<div>")
        dayDiv.addClass("forecast")
        dayDiv.html(`<h3> ${new Date(day.date * 1000).toLocaleDateString('en-GB', { weekday: 'long' })} </h3>
    <img src = "http://openweathermap.org/img/wn/${day.weatherIcon}@2x.png"/>
    <p>Temp: ${day.temp} \u00B0 C </p>
    <p>Wind: ${day.windSpeed} KPH </p>
    <p>Humitity: ${day.humidity} % </p>`)
    displayForecast.append(dayDiv);
    }
    // locally store data, using the paramters carried forward from first AJAX API call (cityName, cityLat, cityLon)
    var cityForecast = {
        cityName: response.cityName,
        cityLat: response.cityLat,
        cityLon: response.cityLon,
        // forecast: fiveDayForecast,
    }
    localStorage.setItem(response.cityName, JSON.stringify(cityForecast));
    populateHistory();
}

//  history btn recall
// function historyRecast() {
//     var storage = Object.keys(localStorage);
//     storage.forEach(element => {
//         var parsedStore = JSON.parse((localStorage.getItem(element)))
//         getWeatherByLatLon(parsedStore.cityName, parsedStore.cityLat, parsedStore.cityLon);
//     });
// }

// Func to populateHistory - create button for each city searched from localstorage
function populateHistory() {
    historyDiv.empty();
    var storage = Object.keys(localStorage);
    storage.forEach(element => {
        var parsedStore = JSON.parse((localStorage.getItem(element)))
        var historyBtn = $("<button>");
        historyBtn.addClass("historyBtn")
        historyBtn.text(parsedStore.cityName);
        historyBtn.on("click", function (event) {
            getWeatherByLatLon(parsedStore.cityName, parsedStore.cityLat, parsedStore.cityLon)
        })
        historyDiv.append(historyBtn);
    });
}





















