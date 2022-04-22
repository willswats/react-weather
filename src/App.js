import { useEffect, useReducer } from 'react';

import WeatherCurrent from './components/Weather/WeatherCurrent';
import WeatherHourly from './components/Weather/WeatherHourly';
import WeatherDaily from './components/Weather/WeatherDaily';

import getTime from './helpers/getTime';

import './App.css';

export const ACTIONS = {
  SET_LAT_LON: 'set-lat-lon',
  SET_WEATHER: 'set-weather',
  SET_LOCATION: 'set-location',
  RELOAD_CURRENT: 'reload-current',
  RELOAD_HOURLY: 'reload-hourly',
  RELOAD_DAILY: 'reload-daily',
};

const initialState = {
  lat: undefined,
  lon: undefined,
  location: [],
  currentWeather: {
    time: undefined,
    data: [],
  },
  hourlyWeather: {
    time: undefined,
    data: [],
  },
  dailyWeather: {
    time: undefined,
    data: [],
  },
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_LAT_LON:
      return {
        ...state,
        lat: payload.lat,
        lon: payload.lon,
      };
    case ACTIONS.SET_WEATHER:
      return {
        ...state,
        currentWeather: { time: getTime(), data: payload.data.current },
        hourlyWeather: { time: getTime(), data: payload.data.hourly },
        dailyWeather: { time: getTime(), data: payload.data.daily },
      };
    case ACTIONS.SET_LOCATION:
      return { ...state, location: payload.data[0] };
    case ACTIONS.RELOAD_CURRENT:
      return {
        ...state,
        currentWeather: { time: getTime(), data: payload.data.current },
      };
    case ACTIONS.RELOAD_HOURLY:
      return {
        ...state,
        hourlyWeather: { time: getTime(), data: payload.data.hourly },
      };
    case ACTIONS.RELOAD_DAILY:
      return {
        ...state,
        dailyWeather: { time: getTime(), data: payload.data.daily },
      };
    default:
      break;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { currentWeather, hourlyWeather, dailyWeather, location, lat, lon } =
    state;

  useEffect(() => {
    const fetchAppData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch({
          type: ACTIONS.SET_LAT_LON,
          payload: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
        });
      });
      if (lat && lon) {
        await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            dispatch({ type: ACTIONS.SET_WEATHER, payload: { data } });
          });

        await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            dispatch({ type: ACTIONS.SET_LOCATION, payload: { data } });
          });
      }
    };

    fetchAppData();
  }, [lat, lon]);

  return (
    <div className="app">
      <WeatherCurrent
        weather={currentWeather}
        location={location}
        lat={lat}
        lon={lon}
        dispatch={dispatch}
      />
      <WeatherHourly
        weather={hourlyWeather}
        lat={lat}
        lon={lon}
        dispatch={dispatch}
      />
      <WeatherDaily
        weather={dailyWeather}
        lat={lat}
        lon={lon}
        dispatch={dispatch}
      />
    </div>
  );
};

export default App;
