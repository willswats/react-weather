import { useEffect, useReducer } from 'react';

import Card from './components/UI/Card';

import WeatherNav from './components/Weather/WeatherNav';
import WeatherCurrent from './components/Weather/WeatherCurrent';
import WeatherHourly from './components/Weather/WeatherHourly';
import WeatherDaily from './components/Weather/WeatherDaily';

import askForLatLon from './helpers/askForLatLon';
import { fetchWeatherData, fetchReverseGeocodingData } from './helpers/api';

import './App.css';

export const ACTIONS = {
  SET_LAT_LON: 'set-lat-lon',
  SET_WEATHER: 'set-weather',
  SET_LOCATION: 'set-location',
  SET_MEASUREMENT: 'set-measurement',
  SET_ERROR: 'set-error',
  RELOAD: 'reload',
};

export const MEASUREMENTS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
};

const initialState = {
  lat: null,
  lon: null,
  weather: [],
  location: [],
  measurement: MEASUREMENTS.METRIC,
  error: null,
  reload: false,
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
        weather: payload.data,
      };
    case ACTIONS.SET_LOCATION:
      return {
        ...state,
        location: payload.data[0],
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
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: payload.message,
      };
    case ACTIONS.RELOAD:
      return {
        ...state,
        weather: initialState.weather,
        reload: !state.reload,
      };
    default:
      break;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { lat, lon, weather, location, measurement, error, reload } = state;
  const { current, hourly, daily } = weather;

  useEffect(() => {
    const getAppData = async () => {
      const getLatLon = async () => {
        try {
          const { lat, lon } = await askForLatLon();
          dispatch({ type: ACTIONS.SET_LAT_LON, payload: { lat, lon } });
        } catch (error) {
          dispatch({
            type: ACTIONS.SET_ERROR,
            payload: { message: error.message },
          });
        }
      };

      const getWeatherData = async (units) => {
        const { status, data } = await fetchWeatherData(lat, lon, units);
        if (status) {
          dispatch({ type: ACTIONS.SET_WEATHER, payload: { data } });
        } else {
          dispatch({
            type: ACTIONS.SET_ERROR,
            payload: { message: data.message },
          });
        }
      };

      const getlocationData = async () => {
        const { status, data } = await fetchReverseGeocodingData(lat, lon);
        if (status) {
          dispatch({ type: ACTIONS.SET_LOCATION, payload: { data } });
        } else {
          dispatch({
            type: ACTIONS.SET_ERROR,
            payload: { message: data.message },
          });
        }
      };

      if (!lat && !lon) {
        getLatLon();
      }
      if (lat && lon) {
        getWeatherData(measurement);
        getlocationData();
      }
    };
    getAppData();
  }, [lat, lon, measurement, reload]);

  return (
    <div className="app">
      <WeatherNav measurement={measurement} dispatch={dispatch} />
      {error && <Card title={<>Something went wrong!</>} error={error} />}
      {!error && <WeatherCurrent weather={current} location={location} />}
      {!error && <WeatherHourly weather={hourly} />}
      {!error && <WeatherDaily weather={daily} />}
    </div>
  );
};

export default App;
