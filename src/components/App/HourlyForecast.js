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
          <div className={classes['hours']}>
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

              return (
                <div className={classes['hours__item']} key={index}>
                  <h2 className={classes['hours__title']}>{title}</h2>
                  <img
                    className={classes['hours__img']}
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={`${description}`}
                  ></img>
                  <p className={classes['hours__temp']}>{temp}&#176;</p>
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
