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
          <div className={classes['days']}>
            {daily.slice(0, 5).map((day, index) => {
              let title = 'Today';
              if (index > 0) {
                title = getDay(index);
              }

              const icon = day.weather[0].icon;
              const description = capitaliseFirstLetters(day.weather[0].icon);
              const maxTemp = Math.round(day.temp.max);
              const minTemp = Math.round(day.temp.min);

              return (
                <div className={`${classes['days__item']}`} key={index}>
                  <h2 className={classes['days__title']}>{title}</h2>
                  <img
                    className={classes['days__img']}
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={`${description}`}
                  ></img>
                  <p className={classes['days__max']}>{maxTemp}&#176;</p>
                  <p className={classes['days__min']}>{minTemp}&#176;</p>
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
