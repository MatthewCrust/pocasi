import React, { useState, useEffect } from 'react';
import './card.css'; 

function Card({ mesto }) {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const apiKey = '105f5a492b6d4877bdd0096e6a897f36';


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${mesto}&appid=${apiKey}&lang=cz`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });


    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${mesto}&appid=${apiKey}&lang=cz`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        return response.json();
      })
      .then(data => {

        const filteredForecastData = data.list.filter(item => {

          const date = new Date(item.dt * 1000);
          return date.getHours() === 13 && date.getMinutes() === 0; 
        });
        setForecastData(filteredForecastData);
      })
      .catch(error => {
        console.error('Error fetching forecast data:', error);
      });
  }, [mesto]);

  function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(1);
  }

  return (
    <div className="card-container">

      {weatherData && forecastData && (
        <div className="card">
          <div className="current-weather">
            <div className="weather-info">
                <p>Dnes</p>
                <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
              className="weather-icon"
              height={80}
              width={80}
            />
              <p id='currentTemp'>{kelvinToCelsius(weatherData.main.temp)} °C</p>
              <p id='currentWeather'>{weatherData.weather[0].description}</p>
              <p>Vlhkost: <span class='currentVal'>{weatherData.main.humidity}%</span></p>
              <p>Vítr: <span class='currentVal'>{weatherData.wind.speed} m/s</span></p>
              <p>Tlak: <span class='currentVal'>{weatherData.main.pressure} hPa</span></p>
              <p>Viditelnost: <span class='currentVal'>{weatherData.visibility / 1000} km</span></p>
              <p>Východ slunce: <span class='currentVal'>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</span></p>
              <p>Západ slunce: <span class='currentVal'>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</span></p>
            </div>

          </div>

            <div className='forecast-container'>
                <h2 className="card-title">{mesto}</h2>
                <div className="forecast">
                        {forecastData.map((item, index) => (
                    <div key={index} className="forecast-item">
                                        <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                        <p>{new Date(item.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        <img
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt="Forecast Weather Icon"
                        className="forecast-icon"
                        />
                        <p><span id='forecastTemp'>{kelvinToCelsius(item.main.temp)} °C</span></p>
                        <p><span id='forecastWeather'>{item.weather[0].description}</span></p>
                    </div>
                    ))}
                </div>
            </div>

          <div>

          </div>

        </div>
      )}
    </div>
  );
}

export default Card;
