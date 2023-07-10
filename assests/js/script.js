var serachBtn = document.getElementById("search-btn");
var list = document.getElementById("city-history");

var lat;
var lon;
var cityName;

// clear input every new call
function getCity() {
  var input = document.getElementById("cityInput");
  cityName = input.value;

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
      console.log(data);
      console.log(data[0].lat);
      console.log(data[0].lon);
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
    // data.list.length
    .then(function (data) {
      console.log(data);

      //   try for each ? need last day 5
      // var timeArray = [8, 16, 24, 32, 40];
      // for (var i = 8; i < data.list.length; i += 8) {
      //   console.log(data.list[i].dt_txt);
      //   var furtureForecast = document.getElementById("future-forecast");
      //   var date1 = document.createElement("p");
      //   var futureWeatherTemp = document.createElement("p");
      //   var futuretWeatherWind = document.createElement("p");
      //   var futureWeatherHumidty = document.createElement("p");
      //   date1.textContent = dayjs(data.list[i].dt_txt).format("MM/DD/YYYY");
      //   futureWeatherTemp.textContent =
      //     "Temperature: " + data.list[i].main.temp;
      //   futuretWeatherWind.textContent =
      //     "Wind Speed: " + data.list[i].wind.speed;
      //   futureWeatherHumidty.textContent =
      //     "Humidity: " + data.list[i].main.humidity;
      //   furtureForecast.append(
      //     date1,
      //     futureWeatherTemp,
      //     futuretWeatherWind,
      //     futureWeatherHumidty
      //   );
      // }

      // var todayForecast = document.getElementById("current-forecast");
      // var nameCity = document.createElement("h2");
      // var date = document.createElement("p");
      // var currentWeatherTemp = document.createElement("p");
      // var currentimage = document.createElement("img");
      // if (data.list[0].weather[0].main === "Clouds") {
      //   currentimage.src = "./assests/images/Cloudy.png";
      // } else if (data.list[0].weather[0].main === "Thunderstorms") {
      //   currentimage.src = "./assests/images/thunderstorms.png";
      // } else if (data.list[0].weather[0].main === "Rain") {
      //   currentimage.src = "./assests/images/Rain.png";
      // } else if (data.list[0].weather[0].main === "Snow") {
      //   currentimage.src = "./assests/images/Snow.png";
      // } else if (data.list[0].weather[0].main === "Clear") {
      //   currentimage.src = "./assests/images/Sunny.png";
      // }
      // var currentWeatherWind = document.createElement("p");
      // var currentWeatherHumidty = document.createElement("p");
      // nameCity.textContent = cityName;
      // date.textContent = dayjs(data.list[0].dt_txt).format("MM/DD/YYYY");
      // currentWeatherTemp.textContent = "Temperature: " + data.list[0].main.temp;
      // currentimage;
      // currentWeatherWind.textContent = "Wind Speed: " + data.list[0].wind.speed;
      // currentWeatherHumidty.textContent =
      //   "Humidity: " + data.list[0].main.humidity;
      // todayForecast.append(
      //   nameCity,
      //   date,
      //   currentimage,
      //   currentWeatherTemp,
      //   currentWeatherWind,
      //   currentWeatherHumidty
      // );

      var todayForecast = document.getElementById("current-forecast");
      var nameCity = document.createElement("h2");
      getinfo(0, todayForecast);
      function getinfo(i, docEl) {
        var date = document.createElement("p");
        var currentWeatherTemp = document.createElement("p");
        var currentimage = document.createElement("img");
        if (data.list[i].weather[i].main === "Clouds") {
          currentimage.src = "./assests/images/Cloudy.png";
        } else if (data.list[i].weather[i].main === "Thunderstorms") {
          currentimage.src = "./assests/images/thunderstorms.png";
        } else if (data.list[i].weather[i].main === "Rain") {
          currentimage.src = "./assests/images/Rain.png";
        } else if (data.list[i].weather[i].main === "Snow") {
          currentimage.src = "./assests/images/Snow.png";
        } else if (data.list[i].weather[i].main === "Clear") {
          currentimage.src = "./assests/images/Sunny.png";
        }
        var currentWeatherWind = document.createElement("p");
        var currentWeatherHumidty = document.createElement("p");
        nameCity.textContent = cityName;
        date.textContent = dayjs(data.list[0].dt_txt).format("MM/DD/YYYY");
        currentWeatherTemp.textContent =
          "Temperature: " + data.list[0].main.temp;
        currentimage;
        currentWeatherWind.textContent =
          "Wind Speed: " + data.list[0].wind.speed;
        currentWeatherHumidty.textContent =
          "Humidity: " + data.list[0].main.humidity;
        docEl.append(
          nameCity,
          date,
          currentimage,
          currentWeatherTemp,
          currentWeatherWind,
          currentWeatherHumidty
        );
      }
    });
}

function searchHx() {}
serachBtn.addEventListener("click", getCity);
list.addEventListener("click", searchHx);

// when click button need to get input of city
// city lat and lon into api key
// scrap all info from api
// put into correct places on dahboard
// somehow log history
