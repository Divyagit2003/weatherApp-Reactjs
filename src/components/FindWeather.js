import React, { useState } from "react";
import axios from "axios";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { BsCloudSun } from "react-icons/bs";
import './Weather.css'

const FindWeather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [dateTime, setDateTime] = useState("");

  const API_KEY = "c4bbfafc7fc59eed8f807a9be160b841";

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const getWeather = () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    setError("");

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        setDateTime(`${date} ${time}`);
      })
      .catch(() => {
        setError("City not found! Please try again.");
        setWeatherData(null);
        setDateTime("");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-6">Weather App</h1>
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={handleChange}
          className="w-full p-3 border text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={getWeather}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Find Weather
        </button>

        {error && <p className="text-red-600 text-center mt-3">{error}</p>}

        {weatherData && (
          <div className="mt-6 bg-blue-100 rounded-xl p-5 shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {weatherData.name}
            </h2>
            <p className="text-sm text-gray-600 mb-3">{dateTime}</p>
            <div className="text-gray-700 flex flex-col gap-3">
              <p className="flex items-center justify-center gap-2 text-lg">
                <FaTemperatureHigh className="text-red-500 text-xl" />
                Temperature: {weatherData.main.temp}°C
              </p>
              <p className="flex items-center justify-center gap-2 text-lg">
                <WiHumidity className="text-blue-500 text-xl" />
                Humidity: {weatherData.main.humidity}%
              </p>
              <p className="flex items-center justify-center gap-2 text-lg">
                <BsCloudSun className="text-yellow-500 text-xl" />
                Weather: {weatherData.weather[0].description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindWeather;
