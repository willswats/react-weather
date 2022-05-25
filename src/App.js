import { useEffect, useReducer } from 'react';

import Card from './components/UI/Card';

import AppNav from './components/App/AppNav';
import CurrentSummary from './components/App/CurrentSummary';
import HourlyForecast from './components/App/HourlyForecast';
import DailyForecast from './components/App/DailyForecast';
import CurrentWeather from './components/App/CurrentWeather';
import AppFooter from './components/App/AppFooter';

import askForLatLon from './helpers/askForLatLon';
import { fetchWeatherData, fetchReverseGeocodingData } from './helpers/api';

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
    <>
      <div id="modal"></div>
      <div className="app">
        <AppNav
          location={location}
          measurement={measurement}
          dispatch={dispatch}
          setWeatherData={setWeatherData}
        />
        {error && <Card title={<>Something went wrong!</>} error={error} />}
        {!error && <CurrentSummary weather={weather} location={location} />}
        {!error && <HourlyForecast weather={weather} />}
        {!error && <DailyForecast weather={weather} />}
        {!error && (
          <CurrentWeather weather={weather} measurement={measurement} />
        )}
        <AppFooter />
      </div>
    </>
  );
};

export default App;
