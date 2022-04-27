import { ACTIONS, MEASUREMENTS } from '../../App';
import { WEATHER_TYPES } from '../../App';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import { fetchWeatherData } from '../../helpers/api';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherCurrent.module.css';

const WeatherCurrent = ({ measurement, weather, location, dispatch }) => {
  if (
    weather.data !== undefined &&
    weather.time !== undefined &&
    location.lat !== undefined &&
    location.lon !== undefined
  ) {
    const { time, data } = weather;
    const { lat, lon } = location;

    const description = capitaliseFirstLetters(data.weather[0].description);
    const temperature = Math.round(data.temp);

    const reloadHandler = async () => {
      dispatch({
        type: ACTIONS.RESET_WEATHER,
        payload: { weatherType: WEATHER_TYPES.CURRENT },
      });
      if (measurement === MEASUREMENTS.METRIC) {
        const weatherData = await fetchWeatherData(lat, lon, 'metric');
        dispatch({
          type: ACTIONS.SET_WEATHER,
          payload: { weatherData, weatherType: WEATHER_TYPES.CURRENT },
        });
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        const weatherData = await fetchWeatherData(lat, lon, 'imperial');
        dispatch({
          type: ACTIONS.SET_WEATHER,
          payload: { weatherData, weatherType: WEATHER_TYPES.CURRENT },
        });
      }
    };

    return (
      <Card
        title={`Current Forecast at ${time}`}
        body={
          <div className={classes['current']}>
            <p className={classes['current__temperature']}>
              {temperature}&#176;
            </p>
            <p className={classes['current__description']}>{description}</p>
          </div>
        }
        reloadHandler={reloadHandler}
      />
    );
  } else return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
};

export default WeatherCurrent;
