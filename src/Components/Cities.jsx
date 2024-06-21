import React, { useState, useEffect } from "react";
import { apiKey } from "../api"; 

async function fetchWeatherData(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Incorrect Response");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function Cities() {
  const [userCity, setUserCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [neighboringCities, setNeighboringCities] = useState([]);
  const [selectedNeighboringCity, setSelectedNeighboringCity] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        {/* To locate user's current location */}
        const reverseGeocodingEndpoint = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
        const reverseGeocodingData = await fetchWeatherData(
          reverseGeocodingEndpoint
        );
        const city = reverseGeocodingData[0].name;
        setUserCity(city);

        {/* To fetch user's current location's current weather */}
        const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const weatherResponse = await fetchWeatherData(weatherEndpoint);
        setWeatherData(weatherResponse);

        {/* To fetch neighbouring cities */}
        const neighboringCitiesEndpoint = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=5&appid=${apiKey}`;
        const neighboringCitiesResponse = await fetchWeatherData(
          neighboringCitiesEndpoint
        );
        setNeighboringCities(neighboringCitiesResponse.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  async function handleNeighboringCityClick(city) {
    try {
      {/* To fetch weather of neighbouring cities */}
      const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`;
      const weatherResponse = await fetchWeatherData(weatherEndpoint);
      setSelectedNeighboringCity(weatherResponse);
    } catch (error) {
      console.error(
        "Error getting weather data for selected city:",
        error
      );
    }
  }

  return (
    <div className="cities d-sm-flex">
      <div className="content-left col-12 col-sm-7">
        <ul className="cities-ul list-unstyled p-2 ps-sm-3 ps-0 pe-0">
          {neighboringCities.map((city, index) => (
            <div className="p-1" key={index}>
              <li
                className="p-3 d-flex"
                onClick={() => handleNeighboringCityClick(city)}
              >
                <div>
                  {city.weather && city.weather[0] && (
                    <img
                      src={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
                      alt={city.weather[0].description}
                    />
                  )}
                  <span> {city.name} </span>
                </div>
                {city.main && (
                  <b className="text-secondary">
                    {" "}
                    {Math.round(city.main.temp - 273.15)} °C{" "}
                  </b>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>

      <div className="p-3 ps-2 col-sm-5">
        {selectedNeighboringCity && (
          <div className="content-right col-12">
            <div className="city-info-heading d-flex d-sm-block d-md-flex">
              <div>
                <h2 className="display-6">{selectedNeighboringCity.name}</h2>
                {selectedNeighboringCity.main && (
                  <h1>
                    {" "}
                    {Math.round(selectedNeighboringCity.main.temp - 273.15)} °C
                  </h1>
                )}
              </div>
              <div>
                {selectedNeighboringCity.weather &&
                  selectedNeighboringCity.weather[0] && (
                    <img
                      src={`http://openweathermap.org/img/wn/${selectedNeighboringCity.weather[0].icon}.png`}
                      alt={selectedNeighboringCity.weather[0].description}
                    />
                  )}
              </div>
            </div>
            <hr className="text-light" />
            <div className="extra-city-info ps-1 pe-1">
              {selectedNeighboringCity.weather &&
                selectedNeighboringCity.weather[0] && (
                  <p>
                    <b> {selectedNeighboringCity.weather[0].description} </b>
                  </p>
                )}
              {selectedNeighboringCity.main && (
                <p>
                  <b> Humidity: </b> {selectedNeighboringCity.main.humidity} %
                </p>
              )}
              {selectedNeighboringCity.wind && (
                <p>
                  <b> Wind: </b> {selectedNeighboringCity.wind.speed} m/s
                </p>
              )}
              {selectedNeighboringCity.visibility && (
                <p>
                  <b> Visibility: </b>{" "}
                  {selectedNeighboringCity.visibility / 1000} km
                </p>
              )}
              {selectedNeighboringCity.main && (
                <p>
                  <b> Pressure: </b> {selectedNeighboringCity.main.pressure} hPa
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cities;
