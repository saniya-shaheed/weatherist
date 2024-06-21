import React from "react";

function Settings() {
  return (
    <div className="pt-4 ps-3 pe-3 pb-1">
      <div className="settings-section border rounded-3 pb-4">
        <h5 className="p-5 ps-2 ps-sm-3 pb-3 pt-3 settings-heading"> Units </h5>
        <h6 className="ps-2 ps-sm-3  units-heading"> TEMPERATURE </h6>
        <div
          class="ps-2 ps-sm-3 col-8 btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="col-4 btn-check"
            name="temperature"
            id="temperature1"
            autoComplete="off"
            checked
          />
          <label className="btn btn-outline-primary" for="temperature1">
            {" "}
            Celsius{" "}
          </label>
          <input
            type="radio"
            className="col-4 btn-check"
            name="temperature"
            id="temperature2"
            autoComplete="off"
          />
          <label className="btn btn-outline-primary" for="temperature2">
            {" "}
            Farenheit{" "}
          </label>
        </div>

        <h6 className="ps-2 ps-sm-3 pt-3 units-heading"> WIND SPEED </h6>
        <div
          class="ps-2 ps-sm-3  col-8 btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="col-3 btn-check"
            name="wind"
            id="wind1"
            autoComplete="off"
            checked
          />
          <label className="btn btn-outline-primary" for="wind1">
            {" "}
            m/s{" "}
          </label>
          <input
            type="radio"
            className="col-3 btn-check"
            name="wind"
            id="wind2"
            autoComplete="off"
          />
          <label className="btn btn-outline-primary" for="wind2">
            {" "}
            km/h{" "}
          </label>
          <input
            type="radio"
            className="col-3 btn-check"
            name="wind"
            id="wind3"
            autoComplete="off"
          />
          <label className="btn btn-outline-primary" for="wind3">
            {" "}
            Knots{" "}
          </label>
        </div>

        <h6 className="ps-2 ps-sm-3 pt-3  units-heading"> PRESSURE </h6>
        <div
          class="ps-2 ps-sm-3 col-8  btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="col-2 btn-check"
            name="pressure"
            id="pressure1"
            autoComplete="off"
            checked
          />
          <label className="btn btn-outline-primary" for="pressure1">
            {" "}
            hPa{" "}
          </label>
          <input
            type="radio"
            className="col-2 btn-check"
            name="pressure"
            id="pressure2"
            autoComplete="off"
          />
          <label className="btn btn-outline-primary" for="pressure2">
            {" "}
            kPa{" "}
          </label>
          <input
            type="radio"
            className="col-2 btn-check"
            name="pressure"
            id="pressure3"
            autoComplete="off"
          />
          <label className="btn btn-outline-primary" for="pressure3">
            {" "}
            Inches{" "}
          </label>
          <input
            type="radio"
            className="col-2 btn-check"
            name="pressure"
            id="pressure4"
            autoComplete="off"
          />
          <label className="btn btn-outline-primary" for="pressure4">
            {" "}
            mm{" "}
          </label>
        </div>

        <h6 className="ps-2 ps-sm-3 pt-3 units-heading"> PRECIPITATIONS </h6>
        <div
          class="ps-2 ps-sm-3  col-8 btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="col-4 btn-check"
            name="precipitations"
            id="precipitations1"
            autoComplete="off"
            checked
          />
          <label className="btn btn-outline-primary" for="precipitations1">
            {" "}
            Millimetres{" "}
          </label>
          <input
            type="radio"
            className="col-4 btn-check"
            name="precipitations"
            id="precipitations2"
            autoComplete="off"
          />
          <label className="btn btn-outline-primary" for="precipitations2">
            {" "}
            Inches{" "}
          </label>
        </div>

        <h6 className="ps-2 ps-sm-3 pt-3  units-heading"> DISTANCE </h6>
        <div
          class="ps-2 ps-sm-3 col-8 btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="col-4 btn-check"
            name="distance"
            id="distance1"
            autoComplete="off"
            checked
          />
          <label className="btn btn-outline-primary" for="distance1">
            {" "}
            Kilometres{" "}
          </label>
          <input
            type="radio"
            className="col-4 btn-check"
            name="distance"
            id="distance2"
            autoComplete="off"
          />
          <label className="btn btn-outline-primary" for="distance2">
            {" "}
            Miles{" "}
          </label>
        </div>
      </div>

      <div className="pt-3 ">
        <div className="settings-section pb-3 border rounded-3">
          <h5 className="p-5 ps-2 ps-sm-3 pb-3 pt-3 settings-heading">
            {" "}
            Notifications{" "}
          </h5>
          <div class="ps-2 pe-2 ps-sm-3 pe-sm-5 form-check form-switch">
            <label class="form-check-label" for="flexSwitchCheckDefault">
              Notifications
            </label>
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
      </div>

      <div className="pt-3 pb-3">
        <div className="settings-section pb-4 border rounded-3">
          <h5 className="p-5 ps-2 ps-sm-3 pb-3 pt-3 settings-heading">
            {" "}
            General{" "}
          </h5>
          <div class="ps-2 pe-2 ps-sm-3 pe-sm-5 form-check form-switch">
            <label class="form-check-label" for="flexSwitchCheckDefault">
              12-Hour Time
            </label>
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
          <div class="ps-2 pe-2 ps-sm-3 pe-sm-5 pb-2 form-check form-switch">
            <label class="form-check-label" for="flexSwitchCheckDefault">
              Location
            </label>
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
