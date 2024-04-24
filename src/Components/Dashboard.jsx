import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Searchbar from './Searchbar'
import Weather from './Weather';
import Cities from './Cities';
import Settings from './Settings';

function Dashboard() {

  const [selectedContent, setSelectedContent] = useState('weather');
  const handleSidebarLinkClick = (content) => {
    setSelectedContent(content);
  }

  const [selectedCity, setSelectedCity] = useState(null);
  const [lastSearchedCities, setLastSearchedCities] = useState([]);
  const handleCitySelect =(city) => {
    setLastSearchedCities((prevCities) => {
      const updatedCities = [city, ...prevCities.slice(0, 4)];
      return updatedCities;
    });
    setSelectedCity(city);
  };
  const [currentCityWeather, setCurrentCityWeather] = useState(null);
  const [neighboringCities, setNeighboringCities] = useState([]);
  
  return (
    <div className='container-fluid d-sm-flex pb-1'>
      <Sidebar onLinkClick={handleSidebarLinkClick} />
        <div className="right-section col-sm-10 col-md-11">
          <Searchbar onCitySelect={handleCitySelect}/>
            <div>
              {selectedContent === 'weather' && (
                <div> <Weather selectedCity={selectedCity} /> </div>
              )}
              {selectedContent === 'cities' && (
                <div> <Cities lastSearchedCities={lastSearchedCities} setCurrentCityWeather={setCurrentCityWeather} />
                </div>
              )}
              {selectedContent === 'settings' && (
                <div> <Settings /> </div>
              )}
            </div>
        </div>
    </div>
);
}

export default Dashboard;
