import LoadingSpinner from '../General/LoadingSpinner';
import ReloadButton from '../General/ReloadButton';
import CurrentTime from '../General/CurrentTime';

import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherToday.module.css';

const WeatherToday = ({ weatherData, reloadHandler }) => {
  if (weatherData.main !== undefined) {
    const placeName = weatherData.name;
    const countryName = weatherData.sys.country;
    const description = capitaliseFirstLetters(
      weatherData.weather[0].description
    );
    const temperature = Math.round(weatherData.main.temp);
    const temperatureMax = Math.round(weatherData.main.temp_max);
    const temperatureMin = Math.round(weatherData.main.temp_min);

    return (
      <div className={classes['card']}>
        <div className={classes['card-top']}>
          <h1>
            {placeName}, {countryName}, at <CurrentTime />
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
