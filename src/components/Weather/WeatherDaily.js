import { ACTIONS } from '../../App';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getDay from '../../helpers/getDay';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherDaily.module.css';

const WeatherDaily = ({ weather, lat, lon, dispatch }) => {
  if (weather.data !== undefined && weather.time !== undefined) {
    const { time, data } = weather;

    const days = data.slice(0, 8);

    const reloadHandler = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: ACTIONS.RELOAD_DAILY, payload: { data } });
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
