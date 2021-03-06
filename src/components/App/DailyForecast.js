import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getDay from '../../helpers/getDay';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './DailyForecast.module.css';

const DailyForecast = ({ weather }) => {
  if (weather !== undefined && weather.daily !== undefined) {
    const { daily } = weather;

    return (
      <Card
        title={`Daily Forecast`}
        body={
          <div className={classes['daily']}>
            {daily.slice(0, 5).map((day, index) => {
              let title = 'Today';
              if (index > 0) {
                title = getDay(weather.timezone, index);
              }

              const icon = day.weather[0].icon;
              const description = capitaliseFirstLetters(day.weather[0].icon);
              const maxTemp = Math.round(day.temp.max);
              const minTemp = Math.round(day.temp.min);
              const pop = `${Math.round(day.pop * 100)}%`;

              return (
                <div className={`${classes['daily__item']}`} key={index}>
                  <h2 className={classes['daily__title']}>{title}</h2>
                  <p className={classes['daily__max']}>{maxTemp}&#176;</p>
                  <p className={classes['daily__min']}>{minTemp}&#176;</p>
                  <img
                    className={classes['daily__img']}
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={`${description}`}
                  ></img>
                  <p className={classes['daily__pop']}>{pop}</p>
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

export default DailyForecast;
