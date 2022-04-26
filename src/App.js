import { useEffect, useReducer } from 'react';

import WeatherBar from './components/Weather/WeatherBar';
import WeatherCurrent from './components/Weather/WeatherCurrent';
import WeatherHourly from './components/Weather/WeatherHourly';
import WeatherDaily from './components/Weather/WeatherDaily';

import askForLatLon from './helpers/askForLatLon';
import { fetchWeatherData, fetchReverseGeocodingData } from './helpers/api';
import getTime from './helpers/getTime';

import './App.css';

export const ACTIONS = {
  SET_WEATHER: 'set-weather',
  SET_LOCATION: 'set-location',
  RESET_WEATHER: 'reset-weather',
  SET_MEASUREMENT: 'set-measurement',
};

export const WEATHER_TYPES = {
  CURRENT: 'current',
  HOURLY: 'hourly',
  DAILY: 'daily',
  ALL: 'all',
};

export const MEASUREMENTS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
};

const initialState = {
  measurement: MEASUREMENTS.METRIC,
  location: [],
  weather: {
    current: {
      time: undefined,
      data: [],
    },
    hourly: {
      time: undefined,
      data: [],
    },
    daily: {
      time: undefined,
      data: [],
    },
  },
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_WEATHER:
      if (payload.weatherType === WEATHER_TYPES.CURRENT) {
        return {
          ...state,
          weather: {
            ...state.weather,
            current: { time: getTime(), data: payload.weatherData.current },
          },
        };
      } else if (payload.weatherType === WEATHER_TYPES.HOURLY) {
        return {
          ...state,
          weather: {
            ...state.weather,
            hourly: { time: getTime(), data: payload.weatherData.hourly },
          },
        };
      } else if (payload.weatherType === WEATHER_TYPES.DAILY) {
        return {
          ...state,
          weather: {
            ...state.weather,
            daily: { time: getTime(), data: payload.weatherData.daily },
          },
        };
      }
      return {
        ...state,
        weather: {
          current: { time: getTime(), data: payload.weatherData.current },
          hourly: { time: getTime(), data: payload.weatherData.hourly },
          daily: { time: getTime(), data: payload.weatherData.daily },
        },
      };
    case ACTIONS.SET_LOCATION:
      return { ...state, location: payload.locationData };
    case ACTIONS.RESET_WEATHER:
      if (payload.weatherType === WEATHER_TYPES.CURRENT) {
        return {
          ...state,
          weather: {
            ...state.weather,
            current: {
              time: initialState.weather.current.time,
              data: initialState.weather.current.data,
            },
          },
        };
      } else if (payload.weatherType === WEATHER_TYPES.HOURLY) {
        return {
          ...state,
          weather: {
            ...state.weather,
            hourly: {
              time: initialState.weather.hourly.time,
              data: initialState.weather.hourly.data,
            },
          },
        };
      } else if (payload.weatherType === WEATHER_TYPES.DAILY) {
        return {
          ...state,
          weather: {
            ...state.weather,
            daily: {
              time: initialState.weather.daily.time,
              data: initialState.weather.daily.data,
            },
          },
        };
      } else if (payload.weatherType === WEATHER_TYPES.ALL) {
        return {
          ...state,
          weather: {
            ...initialState.weather,
          },
        };
      }
      break;
    case ACTIONS.SET_MEASUREMENT:
      if (payload.measurement === MEASUREMENTS.METRIC) {
        return {
          ...state,
          measurement: MEASUREMENTS.METRIC,
        };
      } else if (payload.measurement === MEASUREMENTS.IMPERIAL) {
        return {
          ...state,
          measurement: MEASUREMENTS.IMPERIAL,
        };
      }
      break;
    default:
      break;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { measurement, weather, location } = state;
  const { current, hourly, daily } = weather;

  useEffect(() => {
    const getAppData = async () => {
      const { lat, lon } = await askForLatLon();

      const weatherData = await fetchWeatherData(lat, lon, 'metric');
      dispatch({ type: ACTIONS.SET_WEATHER, payload: { weatherData } });

      const locationData = await fetchReverseGeocodingData(lat, lon);
      dispatch({ type: ACTIONS.SET_LOCATION, payload: { locationData } });
    };
    getAppData();
  }, []);

  return (
    <div className="app">
      <WeatherBar
        location={location}
        measurement={measurement}
        dispatch={dispatch}
      />
      <WeatherCurrent
        weather={current}
        location={location}
        measurement={measurement}
        dispatch={dispatch}
      />
      <WeatherHourly
        weather={hourly}
        location={location}
        measurement={measurement}
        dispatch={dispatch}
      />
      <WeatherDaily
        weather={daily}
        location={location}
        measurement={measurement}
        dispatch={dispatch}
      />
    </div>
  );
};

export default App;
