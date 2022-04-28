import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherCurrent.module.css';
import getTime from '../../helpers/getTime';

const WeatherNow = ({ weather, location }) => {
  if (
    weather !== undefined &&
    location.name !== undefined &&
    location.country !== undefined
  ) {
    const { name, country } = location;

    const temperature = Math.round(weather.temp);
    const description = capitaliseFirstLetters(weather.weather[0].description);
    const icon = weather.weather[0].icon;

    const time = getTime();

    return (
      <Card
        title={`${name}, ${country} at ${time}`}
        body={
          <div className={classes['current']}>
            <div className={classes['current__left']}>
              <p className={classes['current__temperature']}>
                {temperature}&#176;
              </p>
              <p className={classes['current__description']}>{description}</p>
            </div>
            <div className={classes['current__right']}>
              <img
                className={classes['current__img']}
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={`${description}`}
              ></img>
            </div>
          </div>
        }
      />
    );
  } else return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
};

export default WeatherNow;
