import React, { useState, useEffect } from 'react';

function Weather({selectedCity}) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seeMore, setSeeMore] = useState(false);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);

 
    const apiKey = '97850366a0660a33ee4a585a33caa997';

    const getUserLocation = () => {
      if (selectedCity) {
        fetchWeatherDataForCity(selectedCity);
      }
      else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
            fetchHourlyForecast(latitude, longitude);
            fetchDailyForecast(latitude, longitude);
          },
          (error) => {
            console.error('Error getting user location:', error);
            setLoading(false);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    const fetchWeatherDataForCity = (city) => {
      const geocodingUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
      fetch(geocodingUrl)
        .then((response) => response.json())
        .then((data) => {
          const { lat, lon } = data.coord;
          fetchWeatherData(lat, lon);
          fetchHourlyForecast(lat, lon);
          fetchDailyForecast(lat, lon);
        })
        .catch((error) => {
          console.error('Error fetching geocoding data:', error);
          setLoading(false);
        });
    };
        
    const fetchWeatherData = (latitude, longitude) => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setLoading(false);
        });
    };

    const fetchHourlyForecast = (latitude, longitude) => {
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      fetch(forecastUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.list) {
            const hourlyData = data.list.slice(0, 5).map((item) => ({
              dt: item.dt,
              temp: Math.floor(convertKelvinToCelsius(item.main && item.main.temp)),
              weather: item.weather && item.weather.length > 0 ? item.weather[0].description : 'N/A',
              icon: item.weather && item.weather.length > 0 ? item.weather[0].icon : '01d', // Default icon code
            }));
            setHourlyForecast(hourlyData);
          }
        })
        .catch((error) => {
          console.error('Error fetching hourly forecast data:', error);
        });
    };

    const fetchDailyForecast = (latitude, longitude) => {
      const dailyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    
      fetch(dailyForecastUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log('OpenWeatherMap Daily Forecast Data:', data);

      if (data.list) {
        const groupedByDate = data.list.reduce((result, item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          result[date] = result[date] || [];
          result[date].push({
            dt: item.dt,
            temp: Math.floor(convertKelvinToCelsius(item.main && item.main.temp)),
            weather: item.weather && item.weather.length > 0 ? item.weather[0].description : 'N/A',
            icon: item.weather && item.weather.length > 0 ? item.weather[0].icon : '01d',
          });
          return result;
        }, {});
        const dailyData = Object.values(groupedByDate).map((group) => group[0]);

        console.log('Processed OpenWeatherMap Daily Data:', dailyData);
        setDailyForecast(dailyData);
      }
    })
    .catch((error) => {
      console.error('Error fetching OpenWeatherMap daily forecast data:', error);
    });
};

useEffect(() => {
    getUserLocation();
  }, [selectedCity]);

  const handleSeeMore = () => {
    setSeeMore(!seeMore);
  };

  const metersToKilometers = (meters) => {
    return (meters / 1000).toFixed(0);
  };

  const convertKelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  return (
   <div className='d-sm-flex pt-3 ps-2 ps-sm-3'>
     <div className="content-left col-sm-6">
      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        <div>
          <div className="current-weather d-flex pt-xl-5 pb-xl-5">
            <div className=' col-6 '>
              <h1 className='display-3'> {selectedCity || `${weatherData.name}, ${weatherData.sys.country}`} </h1>
              <p className='display-1'><b> {Math.round(weatherData.main.temp)}&deg;C </b></p>
            </div>
            <div className='col-6 d-flex justify-content-center align-items-center '>
              <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description} />
            </div>
          </div>
          <div className=" ">
            <div className="air-conditions bg-light border rounded-3 p-3 ps-2 pb-lg-2 pt-xl-5 pb-xl-5">
              <div className='d-flex'>
                <h6 className='text-secondary me-auto ps-2 pt-2  pb-2'> AIR CONDITIONS </h6>
                <div className='pt-2'>
                  <button className='btn' onClick={handleSeeMore}>
                    {seeMore ? 'See Less' : 'See More'}
                  </button>
                </div>
              </div>
              <ul className='list-unstyled  pt-0 ps-1 pe-1 d-lg-flex'>
                <div className="col-lg-6">
                  <div className='d-lg-flex pb-lg-3'>
                    <div className="col-lg-12 pt-lg-1">
                      {/* Real Feel */}
                      <li className='d-flex d-lg-block'>
                        <div className="col-8">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className=''>
                            <path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V144c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"/>
                          </svg>
                          <span className='ps-1'>Real Feel</span>
                          </div>
                          <span className='col-4 d-flex justify-content-end col-lg-6 justify-content-lg-start ps-lg-3'>
                            <b>{weatherData?.main?.feels_like !== undefined ? weatherData.main.feels_like : 'N/A'} &deg;C</b>
                          </span>
                      </li>
                      {/* Visibility */}
                      <li className='d-flex d-lg-block pt-lg-2'>
                        <div className="col-8">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/>
                          </svg>
                          <span className='ps-1'>Visibility</span>
                        </div>
                        <span className='col-4 d-flex justify-content-end col-lg-6 justify-content-lg-start ps-lg-4'>
                          <b>{metersToKilometers(weatherData?.visibility !== undefined ? weatherData.visibility : 'N/A')} km</b>
                        </span>
                      </li>
                      {seeMore && (
                        <div>
                          <li className='d-flex d-lg-block'>
                            <div className="col-8 pt-lg-2">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-75.1 60.9-136 136-136h8c8.8 0 16 7.2 16 16s-7.2 16-16 16h-8z"/>
                              </svg>
                              <span className='ps-1'>Pressure</span>
                            </div>
                            <span className='col-4 d-flex justify-content-end col-lg-6 justify-content-lg-start ps-lg-3'>
                              <b>{weatherData?.main?.pressure !== undefined ? weatherData.main.pressure : 'N/A'} hPa</b>
                            </span>
                          </li>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Other conditions (Wind Speed, Humidity) */}
                <div className="col-lg-12 pt-lg-1">
                  {/* Wind Speed */}
                  <li className='d-flex d-lg-block'>
                    <div className="col-8">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=''>
                        <path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/>
                      </svg>
                      <span className='ps-1'>Wind Speed</span>
                    </div>
                    <span className='col-4 d-flex justify-content-end col-lg-6 justify-content-lg-start ps-lg-3'>
                      <b>{weatherData?.wind?.speed !== undefined ? weatherData.wind.speed : 'N/A'} m/s</b>
                    </span>
                  </li>
                  {/* Humidity */}
                  <li className='d-flex d-lg-block pt-lg-2'>
                    <div className="col-8">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className=''>
                        <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                      </svg>
                      <span className='ps-1'>Humidity</span>
                    </div>
                    <span className='col-4 d-flex justify-content-end col-lg-6 justify-content-lg-start ps-lg-3'>
                      <b>{weatherData?.main?.humidity !== undefined ? weatherData.main.humidity : 'N/A'} %</b>
                    </span>
                  </li>
                  {seeMore && (
                    <div>
                      <li className='d-flex d-lg-block pt-lg-2'>
                        <div className="col-8">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=''>
                            <path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/>
                          </svg>
                          <span className='ps-1'>Wind Gust</span>
                        </div>
                        <span className='col-4 d-flex justify-content-end col-lg-6 justify-content-lg-start ps-lg-3'>
                          <b>{weatherData?.wind?.gust !== undefined ? weatherData.wind.gust : 'N/A'} m/s</b>
                        </span>
                      </li>
                    </div>
                  )}
                </div>
              </ul>
            </div>
            <div className="pt-3 pb-3">
              <div className='hourly-forcast bg-light border rounded-3 p-3 ps-2 pt-xl-5 pb-xl-5'>
              <h6 className='text-secondary me-auto ps-2 p-3'>TODAY'S FORECAST</h6>
                <div className="p-2 d-md-flex ">
                  {hourlyForecast.map((hour, index) => {
                    // Calculate the next cyclic hour
                    const nextHour = (new Date().getHours() + index) % 24;    
                    // Determine AM/PM
                    const period = nextHour < 12 ? 'AM' : 'PM';
                    // Convert to 12-hour format
                    const displayHour = nextHour % 12 || 12;
                    return index < 5 && (
                      <div key={hour.dt} className='hourly-forcast-window w-100 d-flex flex-md-column align-items-md-center'>
                        <p className='hourly-time text-secondary col-4 d-flex justify-content-start justify-content-md-center'>
                          {displayHour} {period}
                        </p>
                        <p className='col-4 d-flex justify-content-center'>
                          <img src={`http://openweathermap.org/img/w/${hour.icon}.png`} alt={hour.weather} />
                        </p>
                        <p className='col-4 d-flex justify-content-end justify-content-md-center'>
                          <b>{hour.temp}&deg;C </b>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="content-right pb-3 col-sm-6 ps-sm-2 pe-sm-2 ">
      <div className="daily-forecast bg-light border rounded-3 pt-xl-5 pb-xl-5 ">
        <h6 className='text-secondary p-3 pt-4 '>6-DAY FORCAST</h6>
          {dailyForecast.length > 0 ? (   
              dailyForecast.map((day) => (
                <div className='daily-details d-flex ps-2 pe-2 align-items-center border-bottom'>
                  <p key={day.dt} className=' text-secondary col-2  d-flex justify-content-start'>
                    {new Date(day.dt * 1000).toLocaleDateString([], {
                      weekday: 'short',
                    })} </p>
                  <img src={`http://openweathermap.org/img/w/${day.icon}.png`}
                  alt={day.weather} className='col-3  d-flex justify-content-center' />
                  <p className='col-4 d-flex text-center justify-content-center'><b>{day.weather} </b></p>
                  <p className='col-3 d-flex justify-content-end'>           
                  <b> {day.temp}&deg;C  </b></p>
                </div>
          ))):(
              <p> No daily forecast available! </p>
          )}
        </div>
      </div>  
    </div>
  );
}

export default Weather;
