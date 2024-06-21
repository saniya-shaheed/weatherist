// weatherApi.js

export const apiKey = "97850366a0660a33ee4a585a33caa997";
const baseUrl = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherDataForCoordinates = (latitude, longitude) => {
  const apiUrl = `${baseUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      throw error;
    });
};

export const fetchWeatherDataForCity = (city) => {
  const geocodingUrl = `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;

  return fetch(geocodingUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching geocoding data:", error);
      throw error;
    });
};

export const fetchHourlyForecast = (latitude, longitude) => {
  const forecastUrl = `${baseUrl}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  return fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.list) {
        const hourlyData = data.list.slice(0, 5).map((item) => ({
          dt: item.dt,
          temp: Math.floor(item.main.temp),
          weather:
            item.weather && item.weather.length > 0
              ? item.weather[0].description
              : "Not Available",
          icon:
            item.weather && item.weather.length > 0
              ? item.weather[0].icon
              : "01d",
        }));
        return hourlyData;
      }
      return [];
    })
    .catch((error) => {
      console.error("Error fetching hourly forecast data:", error);
      throw error;
    });
};

export const fetchDailyForecast = (latitude, longitude) => {
  const dailyForecastUrl = `${baseUrl}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  return fetch(dailyForecastUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.list) {
        const groupedByDate = data.list.reduce((result, item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          result[date] = result[date] || [];
          result[date].push({
            dt: item.dt,
            temp: Math.floor(item.main.temp),
            weather:
              item.weather && item.weather.length > 0
                ? item.weather[0].description
                : "Not Available",
            icon:
              item.weather && item.weather.length > 0
                ? item.weather[0].icon
                : "01d",
          });
          return result;
        }, {});
        const dailyData = Object.values(groupedByDate).map((group) => group[0]);
        return dailyData;
      }
      return [];
    })
    .catch((error) => {
      console.error("Error fetching daily forecast data:", error);
      throw error;
    });
};
