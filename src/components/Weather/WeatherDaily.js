import { ACTIONS } from '../../App';
import { WEATHER_TYPES } from '../../App';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import { fetchWeatherData } from '../../helpers/api';
import getDay from '../../helpers/getDay';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherDaily.module.css';

const WeatherDaily = ({ weather, location, dispatch }) => {
  if (
    weather.data !== undefined &&
    weather.time !== undefined &&
    location !== undefined
  ) {
    const { time, data } = weather;
    const { lat, lon } = location;

    const days = data.slice(0, 8);

    const reloadHandler = async () => {
      dispatch({
        type: ACTIONS.RESET_WEATHER,
        payload: { weatherType: WEATHER_TYPES.DAILY },
      });
      const weatherData = await fetchWeatherData(lat, lon);
      dispatch({
        type: ACTIONS.SET_WEATHER,
        payload: { weatherData, update: WEATHER_TYPES.DAILY },
      });
    };
    return (
      <Card
        title={`Daily Forecast at ${time}`}
        body={
          <>
            {days.map((day, index) => {
              let today = 'Today';
              if (index > 0) {
                today = getDay(index);
              }
              return (
                <div className={classes['day']} key={index}>
                  <h2 className={classes['day__title']}>{today}</h2>
                  <p className={classes['day__max']}>
                    H:{Math.round(day.temp.max)}&#176;
                  </p>
                  <p className={classes['day__min']}>
                    L:{Math.round(day.temp.min)}&#176;
                  </p>
                  <p className={classes['day__description']}>
                    {capitaliseFirstLetters(day.weather[0].description)}
                  </p>
                </div>
              );
            })}
          </>
        }
        reloadHandler={reloadHandler}
      />
    );
  } else {
    return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
  }
};

export default WeatherDaily;
