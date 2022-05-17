import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './CurrentForecast.module.css';
import convertUnixTime from '../../helpers/convertUnixTime';

const CurrentForecast = ({ weather, location }) => {
  if (
    weather !== undefined &&
    weather.current !== undefined &&
    location !== undefined &&
    location.name !== undefined &&
    location.country !== undefined
  ) {
    const { current } = weather;
    const { name, country } = location;

    const temperature = Math.round(current.temp);
    const description = capitaliseFirstLetters(current.weather[0].description);
    const icon = current.weather[0].icon;

    const time = convertUnixTime(current.dt, 4);

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

export default CurrentForecast;