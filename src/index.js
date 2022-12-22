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
  
  function displayWeather(response) {
    console.log(response.data);
    console.log(response.data.name);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp

    );

    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }
  
  function searchCity(city) {
    let apiKey = "9e8bbfbdad5c237715b2a85ccb163605";
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



  function displayCelsiusTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = document.querySelector("#temperature").innerHTML;
    let celsiusTemperature = (fahrenheitTemperature - 32) * 5 / 9;
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round(celsiusTemperature);
  }

  searchCity("New Orleans");
  
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
let celsiusLink = document.querySelector("#celsius-link"); 
celsiusLink.addEventListener("click", displayCelsiusTemperature);

