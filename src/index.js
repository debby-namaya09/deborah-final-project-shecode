function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  let temperature = response.data.temperature.current;
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  
  getForecast(response.data.city);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastHTML = "";

  forecast.forEach(function (day, index) {
    if (index < 5) {
      let date = new Date(day.time * 1000);
      let dayName = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      forecastHTML += `
        <div class="forecast-day">
          <div>${dayName}</div>
          <img src="${day.condition.icon_url}" width="40" />
          <div>
            <strong>${Math.round(day.temperature.maximum)}°</strong>
            ${Math.round(day.temperature.minimum)}°
          </div>
        </div>
      `;
    }
  });

  document.querySelector("#forecast").innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433"; 
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(url).then(displayForecast);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}


document
  .querySelector("#search-form")
  .addEventListener("submit", handleSearchSubmit);


searchCity("Lusaka");