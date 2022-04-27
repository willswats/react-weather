import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getTime from '../../helpers/getTime';

import classes from './WeatherHourly.module.css';

const WeatherHourly = ({ weather }) => {
  if (weather !== undefined) {
    const hours = weather.slice(0, 5);
    const times = ['Now'];
    for (let i = 1; i <= 5; i++) {
      times.push(`${getTime(i, 2)}:00`);
    }

    return (
      <Card
        title={`Hourly Forecast`}
        body={
          <div className={classes['hourly']}>
            {hours.map((hour, index) => {
              return (
                <div className={classes['hour']} key={index}>
                  <h2 className={classes['hour__title']}>{times[index]}</h2>
                  <p className={classes['hour__temp']}>
                    {Math.round(hour.temp)}&#176;
                  </p>
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

export default WeatherHourly;
