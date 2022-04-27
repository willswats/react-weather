import { ACTIONS } from '../../App';
import { WEATHER_TYPES } from '../../App';
import { MEASUREMENTS } from '../../App';

import Bar from '../UI/Bar';
import LoadingSpinner from '../UI/LoadingSpinner';
import WeatherSearch from './WeatherSearch';

import { fetchWeatherData } from '../../helpers/api';

const WeatherBar = ({ measurement, location, dispatch }) => {
  if (location.lat !== undefined && location.lon !== undefined) {
    const { lat, lon } = location;

    const reloadHandler = async () => {
      dispatch({
        type: ACTIONS.RESET_WEATHER,
        payload: { weatherType: WEATHER_TYPES.ALL },
      });
      if (measurement === MEASUREMENTS.METRIC) {
        const weatherData = await fetchWeatherData(lat, lon, 'metric');
        dispatch({ type: ACTIONS.SET_WEATHER, payload: { weatherData } });
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        const weatherData = await fetchWeatherData(lat, lon, 'imperial');
        dispatch({ type: ACTIONS.SET_WEATHER, payload: { weatherData } });
      }
    };

    const measurementHandler = async () => {
      if (measurement === MEASUREMENTS.METRIC) {
        dispatch({
          type: ACTIONS.SET_MEASUREMENT,
          payload: { measurement: MEASUREMENTS.IMPERIAL },
        });
        dispatch({
          type: ACTIONS.RESET_WEATHER,
          payload: { weatherType: WEATHER_TYPES.ALL },
        });
        const weatherData = await fetchWeatherData(lat, lon, 'imperial');
        dispatch({ type: ACTIONS.SET_WEATHER, payload: { weatherData } });
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        dispatch({
          type: ACTIONS.SET_MEASUREMENT,
          payload: { measurement: MEASUREMENTS.METRIC },
        });
        dispatch({
          type: ACTIONS.RESET_WEATHER,
          payload: { weatherType: WEATHER_TYPES.ALL },
        });
        const weatherData = await fetchWeatherData(lat, lon, 'metric');
        dispatch({ type: ACTIONS.SET_WEATHER, payload: { weatherData } });
      }
    };

    return (
      <Bar
        measurement={measurement}
        measurementHandler={measurementHandler}
        middle={<WeatherSearch location={location} />}
        reloadHandler={reloadHandler}
      />
    );
  } else return <Bar middle={<LoadingSpinner />} />;
};

export default WeatherBar;
