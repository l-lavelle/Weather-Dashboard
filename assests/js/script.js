// Get Elements
var apiKey = "efb1af74c4d1b2a8ddba2ca5d4af980d";
var serachBtn = document.getElementById("search-btn");
var list = document.getElementById("city-history");
var todayForecast = document.getElementById("current-forecast");
var day1 = document.getElementById("day1");
var day2 = document.getElementById("day2");
var day3 = document.getElementById("day3");
var day4 = document.getElementById("day4");
var day5 = document.getElementById("day5");

// Global Variables
var error1;
var lat;
var lon;
var cityName;
var searchHistory = [];

// Clear data, get city name from search bar
function getCity() {
  todayForecast.innerHTML = "";
  day1.innerHTML = "";
  day2.innerHTML = "";
  day3.innerHTML = "";
  day4.innerHTML = "";
  day5.innerHTML = "";

  var input = document.getElementById("cityInput");
  cityName = input.value;
  if (error1) {
    error1.innerHTML = "";
  }
  if (cityName.trim().length === 0) {
    error1 = document.createElement("h3");
    error1.textContent = "Enter City Name";
    error1.setAttribute("style", "color:red");
    serachBtn.after(error1);
  } else {
    request();
  }
}

// Get the lat and lon of city for weather api
function request() {
  var requestCity =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=" +
    apiKey;
  fetch(requestCity).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        if (data.length > 0) {
          lat = data[0].lat;
          lon = data[0].lon;
          appendCityNames(cityName);
          historyButtons();
          getApi();
        }
      });
    }
  });
}

// Get city name and add to array to set to local storage
function appendCityNames(cityName) {
  if (searchHistory.indexOf(cityName) === -1) {
    searchHistory.unshift(cityName);
    if (searchHistory.length > 5) {
      searchHistory.pop();
    }
    window.localStorage.setItem(
      "historyStorage",
      JSON.stringify(searchHistory)
    );
  }
}

// Get items from local storage on page reload and add to city array
function getHistory() {
  var retriedItems = JSON.parse(window.localStorage.getItem("historyStorage"));
  if (retriedItems !== null) {
    for (var i = 0; i < retriedItems.length; i++) {
      searchHistory.push(retriedItems[i]);
    }
  }
}

// Get history from local storage and create search history buttons
function historyButtons() {
  list.innerHTML = "";
  let cityStorage = JSON.parse(window.localStorage.getItem("historyStorage"));
  for (var i = 0; i < cityStorage.length; i++) {
    var hxEl = document.createElement("button");
    hxEl.classList.add("mystyle");
    hxEl.textContent = cityStorage[i];
    list.append(hxEl);
  }
}

// Get weather for current and next 5 days
function getApi() {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var nameCity = document.createElement("h2");
      nameCity.textContent = cityName;
      todayForecast.append(nameCity);

      getinfo(0, todayForecast);
      getinfo(8, day1);
      getinfo(16, day2);
      getinfo(24, day3);
      getinfo(32, day4);
      getinfo(39, day5);

      function getinfo(i, docEl) {
        var date = document.createElement("p");
        var currentWeatherTemp = document.createElement("p");
        var currentimage = document.createElement("img");
        if (data.list[i].weather[0].main === "Clouds") {
          currentimage.src = "./assests/images/Cloudy.png";
        } else if (data.list[i].weather[0].main === "Thunderstorms") {
          currentimage.src = "./assests/images/thunderstorms.png";
        } else if (data.list[i].weather[0].main === "Rain") {
          currentimage.src = "./assests/images/Rain.png";
        } else if (data.list[i].weather[0].main === "Snow") {
          currentimage.src = "./assests/images/Snow.png";
        } else if (data.list[i].weather[0].main === "Clear") {
          currentimage.src = "./assests/images/Sunny.png";
        }
        var currentWeatherWind = document.createElement("p");
        var currentWeatherHumidty = document.createElement("p");

        date.textContent = dayjs(data.list[0].dt_txt).format("MM/DD/YYYY");
        currentWeatherTemp.textContent =
          "Temp: " + data.list[0].main.temp + "°F";
        currentimage;
        currentWeatherWind.textContent =
          "Wind Speed: " + data.list[0].wind.speed + "mph";
        currentWeatherHumidty.textContent =
          "Humidity: " + data.list[0].main.humidity + "%";
        docEl.append(
          date,
          currentimage,
          currentWeatherTemp,
          currentWeatherWind,
          currentWeatherHumidty
        );
      }
    });
}

// Get city name from search history
function searchHx(event) {
  cityName = event.srcElement.innerText;
  requestAgain();
}

// Search for city again
function requestAgain() {
  todayForecast.innerHTML = "";
  day1.innerHTML = "";
  day2.innerHTML = "";
  day3.innerHTML = "";
  day4.innerHTML = "";
  day5.innerHTML = "";
  var requestCity =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=" +
    apiKey;
  fetch(requestCity).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        if (data.length > 0) {
          lat = data[0].lat;
          lon = data[0].lon;
          getApi();
        }
      });
    }
  });
}

// event listeners
serachBtn.addEventListener("click", getCity);
list.addEventListener("click", searchHx);
window.addEventListener("load", getHistory);

// To add: constraints on textbox no results
