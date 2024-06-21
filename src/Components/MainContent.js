// MainContent.js
import React from "react";
import Weather from "./Weather";
import Cities from "./Cities";
import Settings from "./Settings";

const MainContent = ({
  selectedContent,
  selectedCity,
  lastSearchedCities,
  setCurrentCityWeather,
}) => {
  return (
    <div>
      {selectedContent === "weather" && (
        <div>
          <Weather selectedCity={selectedCity} />
        </div>
      )}
      {selectedContent === "cities" && (
        <div>
          <Cities
            lastSearchedCities={lastSearchedCities}
            setCurrentCityWeather={setCurrentCityWeather}
          />
        </div>
      )}
      {selectedContent === "settings" && (
        <div>
          <Settings />
        </div>
      )}
    </div>
  );
};

export default MainContent;
