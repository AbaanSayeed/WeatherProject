document.addEventListener("DOMContentLoaded", function () {
  const apiUrl =
    "https://raw.githubusercontent.com/fayazara/Indian-Cities-API/master/cities.json";
  const cityDropdown = document.getElementById("cityDropdown");
  const defaultCity = "Faridabad";
  const weatherStatus = document.querySelector(".status");
  const temperatureDisplay = document.querySelector(".temperature");
  const bottomSection = document.querySelector(".bottom-section");

  // Fetch city data and populate dropdown
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const cityNames = data.cities.map((city) => city.City);
      cityNames.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        if (city === defaultCity) {
          option.selected = true;
        }
        cityDropdown.appendChild(option);
      });
      fetchWeatherData(defaultCity);
    })
    .catch((error) => {
      console.error("Error fetching cities:", error);
      alert("Failed to load city data. Please try again later.");
    });

  cityDropdown.addEventListener("change", function () {
    const selectedCity = this.value;
    fetchWeatherData(selectedCity);
  });

  function fetchWeatherData(city) {
    const apiKey = "d220e7c824654345854101143241710";
    const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;

    fetch(weatherApiUrl)
      .then((response) => response.json())
      .then((data) => {
        updateWeatherDisplay(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("Failed to load weather data. Please try again later.");
      });
  }

  function updateWeatherDisplay(data) {
    const currentWeather = data.current;
    const weatherIcon = `https:${currentWeather.condition.icon}`;
    const temperature = Math.round(currentWeather.temp_c);
    const weatherDescription = currentWeather.condition.text;

    weatherStatus.innerHTML = `
        <img src="${weatherIcon}" alt="${weatherDescription}" width="40px" height="40px" />
        <span>${weatherDescription.toUpperCase()}</span>
      `;
    temperatureDisplay.textContent = `${temperature}°`;

    // Update future forecast
    bottomSection.innerHTML =
      "<h3>5-Day Forecast</h3><div class='forecast-days'></div>";
    const forecastContainer = bottomSection.querySelector(".forecast-days");

    data.forecast.forecastday.forEach((day, index) => {
      const date = new Date(day.date);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const temp = Math.round(day.day.avgtemp_c);
      const icon = `https:${day.day.condition.icon}`;

      forecastContainer.innerHTML += `
          <div class="forecast-day">
            <p>${dayName}</p>
            <img src="${icon}" alt="${day.day.condition.text}" />
            <p>${temp}°C</p>
          </div>
        `;
    });
  }
});
// ... (previous code remains the same)

function updateWeatherDisplay(data) {
  // ... (previous code remains the same)

  // Update future forecast
  bottomSection.innerHTML =
    "<h3>5-Day Forecast</h3><div class='forecast-days'></div>";
  const forecastContainer = bottomSection.querySelector(".forecast-days");

  data.forecast.forecastday.forEach((day, index) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const temp = Math.round(day.day.avgtemp_c);
    const icon = `https:${day.day.condition.icon}`;

    forecastContainer.innerHTML += `
      <div class="forecast-day">
        <p>${index === 0 ? "Today" : dayName}</p>
        <img src="${icon}" alt="${day.day.condition.text}" />
        <p>${temp}°C</p>
      </div>
    `;
  });
}

// ... (rest of the code remains the same)
