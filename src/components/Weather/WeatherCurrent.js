import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getTime from '../../helpers/getTime';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherCurrent.module.css';

const WeatherCurrent = ({ weatherData, locationData, reloadHandler }) => {
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

    const currentTime = getTime();

    return (
      <Card
        title={`${name}, ${country}, at ${currentTime}`}
        body={
          <div className={classes['current']}>
            <p className={classes['current__temperature']}>
              {temperature}&#176;
            </p>
            <p className={classes['current__description']}>{description}</p>
            <div className="horizontal">
              <p className={classes['current__max']}>
                H:{temperatureMax}&#176;
              </p>
              <p className={classes['current__min']}>
                L:{temperatureMin}&#176;
              </p>
            </div>
          </div>
        }
        reloadHandler={reloadHandler}
      />
    );
  } else return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
};

export default WeatherCurrent;
