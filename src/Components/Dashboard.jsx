import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Searchbar from "./Searchbar";
import MainContent from "./MainContent";

function Dashboard() {
  const [selectedContent, setSelectedContent] = useState("weather");
  const [selectedCity, setSelectedCity] = useState(null);
  const [lastSearchedCities, setLastSearchedCities] = useState([]);
  const [currentCityWeather, setCurrentCityWeather] = useState(null);

  const handleSidebarLinkClick = (content) => {
    setSelectedContent(content);
  };

  const handleCitySelect = (city) => {
    setLastSearchedCities((prevCities) => {
      const updatedCities = [city, ...prevCities.slice(0, 4)];
      return updatedCities;
    });
    setSelectedCity(city);
  };

  return (
    <div className="container-fluid d-sm-flex pb-1">
      <Sidebar onLinkClick={handleSidebarLinkClick} />
      <div className="right-section col-sm-10 col-md-11">
        <Searchbar onCitySelect={handleCitySelect} />
        <MainContent
          selectedContent={selectedContent}
          selectedCity={selectedCity}
          lastSearchedCities={lastSearchedCities}
          setCurrentCityWeather={setCurrentCityWeather}
        />
      </div>
    </div>
  );
}

export default Dashboard;
