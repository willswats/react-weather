import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getDay from '../../helpers/getDay';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './DailyForecast.module.css';

const Dailydaily = ({ weather }) => {
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
                title = getDay(index);
              }

              const icon = day.weather[0].icon;
              const description = capitaliseFirstLetters(day.weather[0].icon);
              const maxTemp = Math.round(day.temp.max);
              const minTemp = Math.round(day.temp.min);
              const rain = day.rain ? day.rain : '0';

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
                  <p className={classes['daily__rain']}>{rain}mm</p>
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

export default Dailydaily;
