import React, { useState, useEffect } from 'react';

function Cities() {
    const [userCity, setUserCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [neighboringCities, setNeighboringCities] = useState([]);
    const [selectedNeighboringCity, setSelectedNeighboringCity] = useState(null);
    const apiKey = '97850366a0660a33ee4a585a33caa997';

    useEffect(() => {
        async function getUserCity() {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const { latitude, longitude } = position.coords;
    
                const reverseGeocodingResponse = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`);
                const reverseGeocodingData = await reverseGeocodingResponse.json();
    
                const city = reverseGeocodingData[0].name;
    
                setUserCity(city);
    
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
                const weatherData = await weatherResponse.json();
    
                setWeatherData(weatherData);
    
                const neighboringCitiesResponse = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=5&appid=${apiKey}`);
                const neighboringCitiesData = await neighboringCitiesResponse.json();
    
                setNeighboringCities(neighboringCitiesData.list);
            } catch (error) {
                console.error("Error getting user's city and weather:", error);
            }
        }
    
        getUserCity();
    }, []);
    async function handleNeighboringCityClick(city) {
        try {
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`);
            const weatherData = await weatherResponse.json();
    
            setSelectedNeighboringCity(weatherData);
        } catch (error) {
            console.error("Error getting weather data for selected neighboring city:", error);
        }
    }
    
    return (
        <div className='cities d-sm-flex'>
            <div className='content-left col-12 col-sm-7'>
                    <ul className='cities-ul list-unstyled p-2 ps-sm-3 ps-0 pe-0'>
                        {neighboringCities.map((city, index) => (
                            <div className='p-1'>
                                <li  className='p-3 d-flex' key={index} onClick={() => handleNeighboringCityClick(city)}>
                                    <div>
                                        <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
                    alt={weatherData.weather[0].description}/>
                                        <span> {city.name} </span>
                                    </div>
                                    <b className='text-secondary'> {Math.round(city.main.temp - 273.15)} °C </b>
                                </li>
                            </div>
                        ))}
                    </ul>
            </div>

            <div className='p-3 ps-2 col-sm-5 '>
                <div className='content-right col-12'>
                            
                    {selectedNeighboringCity && (
                        <div>
                            <div className='city-info-heading d-flex d-sm-block d-md-flex'>
                                <div>
                                    <h2 className='display-6'>{selectedNeighboringCity.name}</h2>
                                    <h1> {Math.round(selectedNeighboringCity.main.temp - 273.15)} °C</h1>
                                </div>
                                <div>
                                    <img src={`http://openweathermap.org/img/wn/${selectedNeighboringCity.weather[0].icon}.png`}
                                    alt={weatherData.weather[0].description} /> 
                                </div>
                            </div>
                            <hr className='text-light'/>
                            <div className='extra-city-info ps-1 pe-1'>
                                <p><b> {selectedNeighboringCity.weather[0].description} </b></p>
                                <p>
                                    <div className='cities-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className=''>
                                            <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                                        </svg>
                                        <span> Humidity:  </span> 
                                    </div>
                                    <span><b> {selectedNeighboringCity.main.humidity} % </b></span>
                                </p>
                                <p>
                                    <div className='cities-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=''>
                                            <path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/>
                                        </svg>
                                        <span> Wind:  </span> 
                                    </div>
                                    <span><b> {selectedNeighboringCity.wind.speed} m/s </b></span>
                                </p>
                                <p>
                                    <div className='cities-svg'>
                                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/>
                                        </svg>
                                        <span> Visibility:  </span> 
                                    </div>
                                    <span><b> {selectedNeighboringCity.visibility / 1000} km </b></span>
                                </p>
                                <p>
                                    <div className='cities-svg'>
                                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-75.1 60.9-136 136-136h8c8.8 0 16 7.2 16 16s-7.2 16-16 16h-8z"/>
                                        </svg>
                                        <span> Pressure:  </span> 
                                    </div>
                                    <span><b> {selectedNeighboringCity.main.pressure} hPa </b></span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cities;




