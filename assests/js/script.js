// var requestUrl=""
// const url = "http://api.openweathermap.org/data/2.5/weather?q=${locationValue}&APPID=API";
var serachBtn = document.getElementById("search-btn");
var list = document.getElementById("city-history");
// var requestUrl= "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid="+apiKey

// var requestUrl= "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=efb1af74c4d1b2a8ddba2ca5d4af980d"
var lat;
var lon;

function getCity() {
  var input = document.getElementById("cityInput");
  var cityName = input.value;

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
    apiKey;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var todayForecast = document.getElementById("current-city");
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
