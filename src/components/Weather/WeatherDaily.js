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
              let title = 'Today';
              if (index > 0) {
                title = getDay(index);
              }

              const icon = day.weather[0].icon;
              const description = capitaliseFirstLetters(day.weather[0].icon);
              const maxTemp = Math.round(day.temp.max);
              const minTemp = Math.round(day.temp.min);

              return (
                <div className={classes['day']} key={index}>
                  <div
                    className={`${classes['day__col']} ${classes['day__col--start']}`}
                  >
                    <h2 className={classes['day__title']}>{title}</h2>
                  </div>
                  <div className={classes['day__col']}>
                    <img
                      className={classes['day__img']}
                      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                      alt={`${description}`}
                    ></img>
                  </div>
                  <div className={classes['day__col']}>
                    <p className={classes['day__max']}>H:{maxTemp}&#176;</p>
                  </div>
                  <div className={classes['day__col']}>
                    <p className={classes['day__min']}>L:{minTemp}&#176;</p>
                  </div>
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
