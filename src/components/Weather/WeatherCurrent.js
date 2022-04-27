import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherCurrent.module.css';
import getTime from '../../helpers/getTime';

const WeatherCurrent = ({ weather, location }) => {
  if (
    weather !== undefined &&
    location.name !== undefined &&
    location.country !== undefined
  ) {
    const { name, country } = location;

    const description = capitaliseFirstLetters(weather.weather[0].description);
    const temperature = Math.round(weather.temp);

    const time = getTime();

    return (
      <Card
        title={`${name}, ${country} at ${time}`}
        body={
          <div className={classes['current']}>
            <p className={classes['current__temperature']}>
              {temperature}&#176;
            </p>
            <p className={classes['current__description']}>{description}</p>
          </div>
        }
      />
    );
  } else return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
};

export default WeatherCurrent;
