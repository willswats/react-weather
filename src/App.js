import { useEffect, useState } from 'react';

import WeatherCurrent from './components/Weather/WeatherCurrent';
import WeatherForecast from './components/Weather/WeatherForecast';

import './App.css';

const App = () => {
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setWeatherData([]);
    setLocationData([]);

    const fetchAppData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });

      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        });

      await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setLocationData(data);
        });
    };

    fetchAppData();
  }, [lat, lon, reload]);

  const reloadHandler = () => {
    setReload(!reload);
  };

  return (
    <div className="app">
      <WeatherCurrent
        weatherData={weatherData}
        locationData={locationData}
        reloadHandler={reloadHandler}
      />
      <WeatherForecast
        weatherData={weatherData}
        locationData={locationData}
        reloadHandler={reloadHandler}
      />
    </div>
  );
};

export default App;
