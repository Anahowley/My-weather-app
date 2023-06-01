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

function showMyTemp(response) {
  console.log(response);
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = Math.round(response.data.main.temp) + `°`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind speed ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
  let pressureResult = document.querySelector("#pressure");
  pressureResult.innerHTML = `Pressure: ${response.data.main.pressure} inHg`;
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
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

function showLocation(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Your current location is ${
    response.data.name
  } and your temperature is ${Math.round(response.data.main.temp)}°c`;
}

function openMyPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey2 = "99b8f9330a1bfba3a85e523fd3c2e528";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey2}&units=metric`;

  axios.get(apiUrl2).then(showLocation);
}
let button = document.querySelector("#current-button");
button.addEventListener("click", openMyPosition);

navigator.geolocation.getCurrentPosition(openMyPosition);
