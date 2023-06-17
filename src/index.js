function showDate() {
  const now = new Date();
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = day[now.getDay()];
  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${currentDay} ${currentTime}`;
}

let dateAndTime = document.querySelector("#dateandtime");
dateAndTime.innerHTML = showDate();

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showMyTemp(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name} `;
  let mainTemp = document.querySelector("#main-temp");
  celsiusTemp = response.data.main.temp;
  mainTemp.innerHTML = Math.round(response.data.main.temp) + `°`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind speed ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

let submitButton = document.querySelector("#submit-form");
submitButton.addEventListener("click", search);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#input-search").value;
  searchCity(city);
}
function searchCity(city) {
  let apiKey = "597c40c39084687093b091cd48b366f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showMyTemp);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey3 = "99b8f9330a1bfba3a85e523fd3c2e528";
  let apiUrl3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey3}&units=metric`;

  console.log(apiUrl3);
  axios.get(apiUrl3).then(displayForecast);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  let fahrenheiTemperature = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature) + `°`;
}

let celsiusTemp = null;

let fahrenheiTemperature = document.querySelector("#fahrenheit-link");
fahrenheiTemperature.addEventListener("click", displayFahrenheitTemperature);

function openMyPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey2 = "99b8f9330a1bfba3a85e523fd3c2e528";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey2}&units=metric`;

  axios.get(apiUrl2).then(showMyTemp);
}

function getMyLocation(event) {
  event.preventDefault();
  console.log(event);
  navigator.geolocation.getCurrentPosition(openMyPosition);
}

let currentButton = document.querySelector("#current-button");
console.log(currentButton);
currentButton.addEventListener("click", getMyLocation);

searchCity("New York");
