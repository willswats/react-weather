import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getDay from '../../helpers/getDay';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './WeatherDaily.module.css';

const WeatherDaily = ({ weather }) => {
  if (weather !== undefined) {
    const days = weather.slice(0, 8);

    return (
      <Card
        title={`Daily Forecast`}
        body={
          <>
            {days.map((day, index) => {
              let today = 'Today';
              if (index > 0) {
                today = getDay(index);
              }
              return (
                <div className={classes['day']} key={index}>
                  <h2 className={classes['day__title']}>{today}</h2>
                  <p className={classes['day__max']}>
                    H:{Math.round(day.temp.max)}&#176;
                  </p>
                  <p className={classes['day__min']}>
                    L:{Math.round(day.temp.min)}&#176;
                  </p>
                  <p className={classes['day__description']}>
                    {capitaliseFirstLetters(day.weather[0].description)}
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
