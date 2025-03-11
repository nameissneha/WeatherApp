import React, { useState, useEffect } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        fetchForecast(data.coord.lat, data.coord.lon);
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchForecast = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setForecast(data);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  return (
    <div className={`weather-container ${darkMode ? "dark-mode" : ""}`}>
      <h2>🌦 Weather App</h2>
      <button className="toggle-mode" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {weather && forecast && (
        <div className="weather-layout">
          {/* Main Weather Card */}
          <div className="weather-main">
            <h3>{weather.name}, {weather.sys.country}</h3>
            <p className="weather-desc">{weather.weather[0].description}</p>
            <h2 className="temp">{weather.main.temp}°C</h2>
            <p>Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s</p>
          </div>
          
          {/* Extra Weather Details */}
          <div className="weather-extra">
            <p>🌇 Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>🌆 Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
            <p>📏 Pressure: {weather.main.pressure} hPa</p>
            <p>👁️ Visibility: {weather.visibility / 1000} km</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
