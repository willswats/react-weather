import { ACTIONS, MEASUREMENTS } from '../../App';
import { WEATHER_TYPES } from '../../App';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import { fetchWeatherData } from '../../helpers/api';
import getTime from '../../helpers/getTime';

import classes from './WeatherHourly.module.css';

const WeatherHourly = ({ measurement, weather, location, dispatch }) => {
  if (
    weather.data !== undefined &&
    weather.time !== undefined &&
    location.lat !== undefined &&
    location.lon !== undefined
  ) {
    const { time, data } = weather;
    const { lat, lon } = location;

    const hours = data.slice(0, 5);
    const times = ['Now'];
    for (let i = 1; i <= 5; i++) {
      times.push(`${getTime(i, 2)}:00`);
    }

    const reloadHandler = async () => {
      dispatch({
        type: ACTIONS.RESET_WEATHER,
        payload: { weatherType: WEATHER_TYPES.HOURLY },
      });
      if (measurement === MEASUREMENTS.METRIC) {
        const weatherData = await fetchWeatherData(lat, lon, 'metric');
        dispatch({
          type: ACTIONS.SET_WEATHER,
          payload: { weatherData, update: WEATHER_TYPES.HOURLY },
        });
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        const weatherData = await fetchWeatherData(lat, lon, 'imperial');
        dispatch({
          type: ACTIONS.SET_WEATHER,
          payload: { weatherData, update: WEATHER_TYPES.HOURLY },
        });
      }
    };

    return (
      <Card
        title={`Hourly Forecast at ${time}`}
        body={
          <div className={classes['hourly']}>
            {hours.map((hour, index) => {
              return (
                <div className={classes['hour']} key={index}>
                  <h2 className={classes['hour__title']}>{times[index]}</h2>
                  <p className={classes['hour__temp']}>
                    {Math.round(hour.temp)}
                  </p>
                </div>
              );
            })}
          </div>
        }
        reloadHandler={reloadHandler}
      />
    );
  } else {
    return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
  }
};

export default WeatherHourly;
