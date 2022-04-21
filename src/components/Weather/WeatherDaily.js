import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getDay from '../../helpers/getDay';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherDaily.module.css';

const WeatherDaily = ({ weatherData }) => {
  if (weatherData.daily !== undefined) {
    const dailyData = weatherData.daily
      .map((day) => {
        return {
          maxTemp: Math.round(day.temp.max),
          minTemp: Math.round(day.temp.min),
          description: capitaliseFirstLetters(
            day.weather.map((arr) => arr.description).shift()
          ),
        };
      })
      .slice(0, 8);

    return (
      <Card
        title={'Daily Forecast'}
        body={
          <>
            {dailyData.map((data, index) => {
              let today = 'Today';
              if (index > 0) {
                today = getDay(index);
              }
              return (
                <div className={classes['day']} key={index}>
                  <h2 className={classes['day__title']}>{today}</h2>
                  <p className={classes['day__max']}>H:{data.maxTemp}&#176;</p>
                  <p className={classes['day__min']}>L:{data.minTemp}&#176;</p>
                  <p className={classes['day__description']}>
                    {data.description}
                  </p>
                </div>
              );
            })}
          </>
        }
      />
    );
  } else {
    return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
  }
};

export default WeatherDaily;
