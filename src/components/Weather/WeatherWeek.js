import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getDayFromCurrent from '../../helpers/getDayFromCurrent';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherWeek.module.css';

const WeatherWeek = ({ weatherData }) => {
  if (weatherData.daily !== undefined) {
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
        title={'Weekly Forecast'}
        body={
          <div className="horizontal">
            {dailyData.map((data, index) => {
              let today = 'Today';
              if (index > 0) {
                today = getDayFromCurrent(index);
              }
              return (
                <div className={classes['card__forecast']} key={index}>
                  <h2 className={classes['card__day']}>{today}</h2>
                  <p className={classes['card__max-temp']}>
                    H: {data.maxTemp}&#176;
                  </p>
                  <p className={classes['card__min-temp']}>
                    L: {data.minTemp}&#176;
                  </p>
                  <p className={classes['card__description']}>
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
    return <LoadingSpinner />;
  }
};

export default WeatherWeek;
