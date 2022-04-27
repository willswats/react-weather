import { useEffect, useReducer } from 'react';

import WeatherNav from './components/Weather/WeatherNav';
import WeatherCurrent from './components/Weather/WeatherCurrent';
import WeatherHourly from './components/Weather/WeatherHourly';
import WeatherDaily from './components/Weather/WeatherDaily';

import askForLatLon from './helpers/askForLatLon';
import { fetchWeatherData, fetchReverseGeocodingData } from './helpers/api';

import './App.css';

export const ACTIONS = {
  SET_WEATHER: 'set-weather',
  SET_LOCATION: 'set-location',
  RESET_WEATHER: 'reset-weather',
  SET_MEASUREMENT: 'set-measurement',
};

export const MEASUREMENTS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
};

const initialState = {
  location: [],
  weather: [],
  measurement: MEASUREMENTS.METRIC,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_WEATHER:
      return {
        ...state,
        weather: payload.data,
      };
    case ACTIONS.SET_LOCATION:
      return { ...state, location: payload.data };
    case ACTIONS.RESET_WEATHER:
      return {
        ...state,
        weather: initialState.weather,
      };
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

  const { weather, location, measurement } = state;
  const { current, hourly, daily } = weather;

  useEffect(() => {
    const getAppData = async () => {
      const { lat, lon } = await askForLatLon();

      const getWeatherData = async () => {
        const data = await fetchWeatherData(lat, lon, 'metric');
        dispatch({ type: ACTIONS.SET_WEATHER, payload: { data } });
      };

      const getlocationData = async () => {
        const data = await fetchReverseGeocodingData(lat, lon);
        dispatch({ type: ACTIONS.SET_LOCATION, payload: { data } });
      };
      getWeatherData();
      getlocationData();
    };
    getAppData();
  }, []);

  return (
    <div className="app">
      <WeatherNav
        location={location}
        measurement={measurement}
        dispatch={dispatch}
      />
      <WeatherCurrent weather={current} location={location} />
      <WeatherHourly weather={hourly} />
      <WeatherDaily weather={daily} />
    </div>
  );
};

export default App;
