
// API key const
const myAPI = "5b86dd1981e818e717862cad25215448"

// HTML DOM queryselectors - jQuery
var historyDiv = $("#history");
var displayToday = $("#today");
var displayForecast = $("#forecast");
var clearBtn = $("#clear-button");
var searchBtn = $("#search-button");

// event listener for page load, call populateHistory function - populate history buttons from localstorage
window.addEventListener("load", populateHistory);

clearBtn.on("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    historyDiv.empty()
});

// Event listener for search button, on click call first API call from search input - get Lat Lon values for a city 
searchBtn.on("click", function (event) {
    event.preventDefault();
    // define search input as var cityName
    var cityName = $("#search-input").val()
    cityName.toLowerCase();
    // clear search input
    $("#search-input").val('');
    // First AJAX API call for geo tag - lat lon using cityName
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + myAPI;
    $.ajax({
        url: queryURL,
        method: "GET"
        // then define lat and lon from response, call getWeatherByLatLon func with theCity, lat, lon as parameters
    }).then(function (response) {
        // validation for user input, alerts if not a valid city name or if a country name is entered
        if (response.length == 0 || !response[0].local_names) {
            alert("Please enter a valid city name");
        } else {
            var lat = response[0].lat;
            var lon = response[0].lon;
            var theCity = response[0].name;
            getWeatherByLatLon(theCity, lat, lon);
        }
    })
});

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
        mapFiveDayForecast(weatherResponse);
    })
}

// mapForecast to dynamically create HTML elements to display 5 day weather forecast
function mapFiveDayForecast(response) {
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
    // set html contents of displayToday, using template string
    displayToday.html(`<h1> ${weatherToday.name} </h1> 
    <h2>${new Date(weatherToday.date * 1000).toLocaleDateString('en-GB', { weekday: 'long' })} </h2>
    <h3>${new Date(weatherToday.date * 1000).toLocaleDateString('en-GB', 'dd/mm/yy')} </h2>
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
    var cityDetails = {
        cityName: response.cityName,
        cityLat: response.cityLat,
        cityLon: response.cityLon,
        // forecast: fiveDayForecast,
    }
    localStorage.setItem(response.cityName, JSON.stringify(cityDetails));
    // call populateHistory
    populateHistory();
}

// Func to populateHistory - create button for each city searched from localstorage
function populateHistory() {
    // empty existing button destination div
    historyDiv.empty();
    // get localstorage key values to store array of city names
    var storage = Object.keys(localStorage);
    // sort alphabetically
    storage.sort()
    // forEach to getItem for each key value(element) in storage array and create a history button using cityName as text
    storage.forEach(element => {
        var parsedStore = JSON.parse((localStorage.getItem(element)))
        var historyBtn = $("<button>");
        historyBtn.addClass("historyBtn");
        historyBtn.text(parsedStore.cityName);
        // add event listener to each button, to getWeatherbyLatLon on click
        historyBtn.on("click", function (event) {
            getWeatherByLatLon(parsedStore.cityName, parsedStore.cityLat, parsedStore.cityLon)
        });
        // append button to historyDiv
        historyDiv.append(historyBtn);
    });
}






















