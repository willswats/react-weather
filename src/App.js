import { useEffect, useReducer } from 'react';

import Card from './components/UI/Card';

import WeatherNav from './components/Weather/WeatherNav';
import WeatherCurrent from './components/Weather/WeatherCurrent';
import WeatherHourly from './components/Weather/WeatherHourly';
import WeatherDaily from './components/Weather/WeatherDaily';

import askForLatLon from './helpers/askForLatLon';
import {
  fetchWeatherData,
  fetchReverseGeocodingData,
  fetchGeocodingData,
} from './helpers/api';

import './App.css';

export const ACTIONS = {
  SET_WEATHER: 'set-weather',
  SET_LOCATION: 'set-location',
  SET_MEASUREMENT: 'set-measurement',
  SET_ERROR: 'set-error',
};

export const MEASUREMENTS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
};

const initialState = {
  weather: [],
  location: [],
  measurement: MEASUREMENTS.METRIC,
  error: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
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
    default:
      break;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { weather, location, measurement, error } = state;
  const { current, hourly, daily, timezone } = weather;

  const setWeatherData = async (lat, lon, units) => {
    // Reset state
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: { message: null },
    });
    dispatch({ type: ACTIONS.SET_WEATHER, payload: { data: [] } });
    // Set state
    try {
      const data = await fetchWeatherData(lat, lon, units);
      dispatch({ type: ACTIONS.SET_WEATHER, payload: { data } });
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { message: error.message },
      });
    }
  };

  const setLocationData = async (lat, lon) => {
    // Reset state
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: { message: null },
    });
    dispatch({ type: ACTIONS.SET_LOCATION, payload: { data: [] } });
    // Set state
    try {
      const data = await fetchReverseGeocodingData(lat, lon);
      dispatch({ type: ACTIONS.SET_LOCATION, payload: { data } });
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { message: error.message },
      });
    }
  };

  const setDataThroughSearch = async (city) => {
    // Reset state
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: { message: null },
    });
    dispatch({ type: ACTIONS.SET_LOCATION, payload: { data: [] } });
    // Set state
    try {
      const data = await fetchGeocodingData(city);
      dispatch({ type: ACTIONS.SET_LOCATION, payload: { data } });
      if (measurement === MEASUREMENTS.METRIC) {
        setWeatherData(data[0].lat, data[0].lon, 'metric');
      }
      if (measurement === MEASUREMENTS.IMPERIAL) {
        setWeatherData(data[0].lat, data[0].lon, 'imperial');
      }
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { message: `"${city}" is not a city.` },
      });
    }
  };

  useEffect(() => {
    const setAppData = async () => {
      try {
        const { lat, lon } = await askForLatLon();
        setWeatherData(lat, lon, 'metric');
        setLocationData(lat, lon);
      } catch (error) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: { message: error.message },
        });
      }
    };
    setAppData();
  }, []);

  return (
    <div className="app">
      <WeatherNav
        location={location}
        measurement={measurement}
        dispatch={dispatch}
        setWeatherData={setWeatherData}
        setDataThroughSearch={setDataThroughSearch}
      />
      {error && <Card title={<>Something went wrong!</>} error={error} />}
      {!error && (
        <WeatherCurrent
          weather={current}
          location={location}
          timezone={timezone}
        />
      )}
      {!error && <WeatherHourly weather={hourly} timezone={timezone} />}
      {!error && <WeatherDaily weather={daily} />}
    </div>
  );
};

export default App;
