import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getCurrentTime from '../../helpers/getCurrentTime';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherToday.module.css';

const WeatherToday = ({ weatherData, locationData }) => {
  if (
    locationData[0] !== undefined &&
    weatherData.current !== undefined &&
    weatherData.daily[0] !== undefined
  ) {
    const { name, country } = locationData[0];

    const description = capitaliseFirstLetters(
      weatherData.current.weather[0].description
    );
    const temperature = Math.round(weatherData.current.temp);

    const temperatureMax = Math.round(weatherData.daily[0].temp.max);
    const temperatureMin = Math.round(weatherData.daily[0].temp.min);

    const time = getCurrentTime();

    return (
      <Card
        title={`${name}, ${country}, at ${time}`}
        body={
          <>
            <p className={classes['card__temperature']}>{temperature}&#176;</p>
            <p className={classes['card__description']}>{description}</p>
            <div className="horizontal">
              <p className={classes['card__max-temp']}>
                H: {temperatureMax}&#176;
              </p>
              <p className={classes['card__min-temp']}>
                L: {temperatureMin}&#176;
              </p>
            </div>
          </>
        }
      />
    );
  } else return <LoadingSpinner />;
};

export default WeatherToday;
