import { useEffect, useState } from 'react';

import WeatherToday from './components/Weather/WeatherToday';

import './App.css';

const App = () => {
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setWeatherData([]);
    const fetchWeatherData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });

      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setWeatherData(data);
        });
    };
    fetchWeatherData();
  }, [lat, lon, reload]);

  const reloadHandler = () => {
    setReload(!reload);
  };

  return (
    <div className="app">
      <WeatherToday weatherData={weatherData} reloadHandler={reloadHandler} />
    </div>
  );
};

export default App;
