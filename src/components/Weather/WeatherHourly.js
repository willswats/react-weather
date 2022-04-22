import { ACTIONS } from '../../App';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getTime from '../../helpers/getTime';

import classes from './WeatherHourly.module.css';

const WeatherHourly = ({ weather, lat, lon, dispatch }) => {
  if (weather.data !== undefined && weather.time !== undefined) {
    const { time, data } = weather;

    const hours = data.slice(0, 5);
    const times = ['Now'];
    for (let i = 1; i <= 5; i++) {
      times.push(`${getTime(i, 2)}:00`);
    }

    const reloadHandler = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: ACTIONS.RELOAD_HOURLY, payload: { data } });
        });
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
                    {Math.round(hour.temp)}&#176;
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
