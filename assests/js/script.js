var serachBtn = document.getElementById("search-btn");
var list = document.getElementById("city-history");
var todayForecast = document.getElementById("current-forecast");
var day1 = document.getElementById("day1");
var day2 = document.getElementById("day2");
var day3 = document.getElementById("day3");
var day4 = document.getElementById("day4");
var day5 = document.getElementById("day5");

var lat;
var lon;
var cityName;

function getCity() {
  todayForecast.innerHTML = "";
  day1.innerHTML = "";
  day2.innerHTML = "";
  day3.innerHTML = "";
  day4.innerHTML = "";
  day5.innerHTML = "";

  var input = document.getElementById("cityInput");
  cityName = input.value;
  request();
}

function request() {
  // if not avaibale or if empty string
  var requestCity =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=" +
    apiKey;
  fetch(requestCity)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data[0].lat;
      lon = data[0].lon;
      var hxEl = document.createElement("button");
      hxEl.textContent = cityName;
      list.append(hxEl);
      getApi();
    });
}

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
      console.log(data);
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

function searchHx(event) {
  // var trail = event.innertext;
  cityName = event.srcElement.innerText;
  requestAgain();
}
function requestAgain() {
  todayForecast.innerHTML = "";
  day1.innerHTML = "";
  day2.innerHTML = "";
  day3.innerHTML = "";
  day4.innerHTML = "";
  day5.innerHTML = "";
  var requestCity =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=" +
    apiKey;
  fetch(requestCity)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data[0].lat;
      lon = data[0].lon;
      getApi();
    });
}
serachBtn.addEventListener("click", getCity);
list.addEventListener("click", searchHx);

// clean code, commets, css, buttons, constraints on textbox, readme and submti
