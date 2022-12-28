function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayTime = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayTime];
  
    return `${day} ${hours}:${minutes}`;
  }
  
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];

}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
let days = ["Sun",  "Mon", "Tue", "Wed", "Thu"];
forecast.forEach(function (forecastDay, index) {
  if (index < 6) {
  forecastHTML = forecastHTML + `
  <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img
      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
      alt=""
      width="40"
    />
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}° </span>
      <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
    </div>
  </div>`;
  }
  })
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
  function displayWeather(response) {
    console.log(response.data);
    console.log(response.data.name);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp 

    );

fahrenheitTemperature = response.data.main.temp;

    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  

    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;

      getForecast(response.data.coord);
  }
  
  function searchCity(city) {
    let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeather);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
  
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let apiKey = "9e8bbfbdad5c237715b2a85ccb163605";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeather);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
  
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);

  let currentLocationButton = document.querySelector("#current-location-btn");
  currentLocationButton.addEventListener("click", getCurrentLocation);


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


searchCity("New Orleans");
