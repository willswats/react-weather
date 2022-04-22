import { ACTIONS } from '../../App';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherCurrent.module.css';

const WeatherCurrent = ({ weather, location, lat, lon, dispatch }) => {
  if (
    weather.data !== undefined &&
    weather.time !== undefined &&
    location !== undefined
  ) {
    const { time, data } = weather;
    const { name, country } = location;

    const description = capitaliseFirstLetters(data.weather[0].description);
    const temperature = Math.round(data.temp);

    const reloadHandler = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: ACTIONS.RELOAD_CURRENT, payload: { data } });
        });
    };

    return (
      <Card
        title={`${name}, ${country}, at ${time}`}
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
