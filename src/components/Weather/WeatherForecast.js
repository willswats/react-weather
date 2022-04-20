import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getDayFromCurrent from '../../helpers/getDayFromCurrent';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherForecast.module.css';

const WeatherForecast = ({ weatherData, locationData, reloadHandler }) => {
  if (locationData[0] !== undefined && weatherData.daily !== undefined) {
    const { name, country } = locationData[0];

    const dailyData = weatherData.daily.map((day) => {
      return {
        maxTemp: Math.round(day.temp.max),
        minTemp: Math.round(day.temp.min),
        description: capitaliseFirstLetters(
          day.weather.map((arr) => arr.description).shift()
        ),
      };
    });

    return (
      <Card
        title={`${name}, ${country} Forecast`}
        reloadHandler={reloadHandler}
        body={
          <div className={classes['days']}>
            {dailyData.map((data, index) => {
              let today = 'Today';
              if (index > 0) {
                today = getDayFromCurrent(index);
              }
              return (
                <div className={classes['day']} key={index}>
                  <h2 className={classes['day__title']}>{today}</h2>
                  <p className={classes['day__max']}>H: {data.maxTemp}&#176;</p>
                  <p className={classes['day__min']}>L: {data.minTemp}&#176;</p>
                  <p className={classes['day__description']}>
                    {data.description}
                  </p>
                </div>
              );
            })}
          </div>
        }
      />
    );
  } else {
    return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
  }
};

export default WeatherForecast;
