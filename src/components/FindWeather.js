import React, { useState } from "react";
import axios from "axios";

const FindWeather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "c4bbfafc7fc59eed8f807a9be160b841";

  const handleChnage = (event) => {
    setCity(event.target.value);
  };

  const getWeather = (e) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&unit=metric`
      )
      .then((response) => setWeatherData(response.data))
      .catch((error) => console.error("Error in fetching data"));
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        placeholder="Check City Weather"
        onChange={handleChnage}
      />
      
      <button onClick={getWeather}>Find Weather</button>

      <div>
        {weatherData && (
          <div>
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            
            <p>Weather: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindWeather;
