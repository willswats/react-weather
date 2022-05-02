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
  SET_WEATHER: 'set-weather',
  SET_LOCATION: 'set-location',
  SET_MEASUREMENT: 'set-measurement',
  SET_ERROR: 'set-error',
  RESET: 'reset',
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
  reset: false,
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
    case ACTIONS.RESET:
      return {
        ...initialState,
        reset: !state.reset,
      };
    default:
      break;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { weather, location, measurement, error, reset } = state;
  const { current, hourly, daily } = weather;

  const getWeatherData = async (lat, lon, units) => {
    dispatch({ type: ACTIONS.SET_WEATHER, payload: { data: [] } });
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

  const getLocationData = async (lat, lon) => {
    dispatch({ type: ACTIONS.SET_WEATHER, payload: { data: [] } });
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

  useEffect(() => {
    const getAppData = async () => {
      try {
        const { lat, lon } = await askForLatLon();

        getWeatherData(lat, lon, 'metric');
        getLocationData(lat, lon);
      } catch (error) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: { message: error.message },
        });
      }
    };
    getAppData();
  }, [reset]);

  return (
    <div className="app">
      <WeatherNav
        location={location}
        measurement={measurement}
        dispatch={dispatch}
        getWeatherData={getWeatherData}
      />
      {error && <Card title={<>Something went wrong!</>} error={error} />}
      {!error && <WeatherCurrent weather={current} location={location} />}
      {!error && <WeatherHourly weather={hourly} />}
      {!error && <WeatherDaily weather={daily} />}
    </div>
  );
};

export default App;
