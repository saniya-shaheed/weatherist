import React, { useState } from "react";

function Searchbar({ onCitySelect }) {
  const [city, setCity] = useState("");

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      onCitySelect(city);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="col-sm-12 ps-sm-2 pe-sm-2">
      <div className="search-bar pt-2 ps-sm-1  pt-sm-3">
        <div className="input-group ">
          <input
            type="text"
            placeholder="Enter city"
            className="form-control"
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleEnterKey}
          />
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
