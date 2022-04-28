import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getDay from '../../helpers/getDay';

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
                  <div className="center">
                    <img
                      className={classes['day__img']}
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt={`${day.weather[0].icon}`}
                    ></img>
                  </div>
                  <div className="center">
                    <p className={classes['day__min']}>
                      L:{Math.round(day.temp.min)}&#176;
                    </p>
                  </div>
                  <div className="center">
                    <p className={classes['day__max']}>
                      H:{Math.round(day.temp.max)}&#176;
                    </p>
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
