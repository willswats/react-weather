import LoadingSpinner from '../General/LoadingSpinner';
import ReloadButton from '../General/ReloadButton';
import CurrentTime from '../General/CurrentTime';

import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherToday.module.css';

const WeatherToday = ({ weatherData, locationData, reloadHandler }) => {
  if (
    locationData[0] !== undefined &&
    weatherData.current !== undefined &&
    weatherData.daily[0] !== undefined
  ) {
    const location = locationData[0];
    const { name, country } = location;

    const currentWeather = weatherData.current;
    const description = capitaliseFirstLetters(
      currentWeather.weather[0].description
    );
    const temperature = Math.round(currentWeather.temp);

    const dayWeather = weatherData.daily[0];
    const temperatureMax = Math.round(dayWeather.temp.max);
    const temperatureMin = Math.round(dayWeather.temp.min);

    return (
      <div className={classes['card']}>
        <div className={classes['card-top']}>
          <h1>
            {name}, {country}, at <CurrentTime />
          </h1>
          <span className={classes['card-reload']}>
            <ReloadButton reloadHandler={reloadHandler} />
          </span>
        </div>
        <div className={classes['card-body']}>
          <p className={classes['temperature']}>{temperature}&#176;</p>
          <p className={classes['description']}>{description}</p>
          <div className={classes['min-max']}>
            <p>H: {temperatureMax}&#176;</p>
            <p>L: {temperatureMin}&#176;</p>
          </div>
        </div>
      </div>
    );
  } else return <LoadingSpinner />;
};

export default WeatherToday;
