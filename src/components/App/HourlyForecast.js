import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getTime from '../../helpers/getTime';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './HourlyForecast.module.css';

const HourlyForecast = ({ weather }) => {
  if (
    weather !== undefined &&
    weather.hourly !== undefined &&
    weather.timezone !== undefined
  ) {
    const { hourly } = weather;

    return (
      <Card
        title={`Hourly Forecast`}
        body={
          <div className={classes['hourly']}>
            {hourly.slice(0, 5).map((hour, index) => {
              let title = 'Now';
              if (index > 0) {
                title = `${getTime(hour.dt, weather.timezone, 2)}:00`;
              }
              const icon = hour.weather[0].icon;
              const description = capitaliseFirstLetters(
                hour.weather[0].description
              );
              const temp = Math.round(hour.temp);
              const pop = `${Math.round(hour.pop * 100)}%`;

              return (
                <div className={classes['hourly__item']} key={index}>
                  <h2 className={classes['hourly__title']}>{title}</h2>
                  <p className={classes['hourly__temp']}>{temp}&#176;</p>
                  <img
                    className={classes['hourly__img']}
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={`${description}`}
                  ></img>
                  <p className={classes['hourly__pop']}>{pop}</p>
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

export default HourlyForecast;
