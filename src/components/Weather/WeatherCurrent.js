import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherCurrent.module.css';
import getTime from '../../helpers/getTime';

const WeatherCurrent = ({ weather, location }) => {
  if (
    weather !== undefined &&
    weather.current !== undefined &&
    weather.timezone !== undefined &&
    location !== undefined &&
    location.name !== undefined &&
    location.country !== undefined
  ) {
    const { current, timezone } = weather;
    const { name, country } = location;

    const temperature = Math.round(current.temp);
    const description = capitaliseFirstLetters(current.weather[0].description);
    const icon = current.weather[0].icon;

    const time = getTime(4, timezone);

    return (
      <Card
        title={`${name}, ${country} at ${time}`}
        body={
          <div className="horizontal">
            <div className={classes['current-left']}>
              <p className={classes['current-left__temperature']}>
                {temperature}&#176;
              </p>
              <p className={classes['current-left__description']}>
                {description}
              </p>
            </div>
            <div className={classes['current-right']}>
              <img
                className={classes['current-right__img']}
                src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                alt={`${description}`}
              ></img>
            </div>
          </div>
        }
      />
    );
  } else return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
};

export default WeatherCurrent;
