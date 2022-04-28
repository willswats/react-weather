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
                  <h2 className={classes['day__title']}>{title}</h2>
                  <div className="center">
                    <img
                      className={classes['day__img']}
                      src={`https://openweathermap.org/img/wn/${icon}.png`}
                      alt={`${description}`}
                    ></img>
                  </div>
                  <p className={classes['day__min']}>H:{maxTemp}&#176;</p>
                  <p className={classes['day__max']}>L:{minTemp}&#176;</p>
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
