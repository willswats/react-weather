import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getTime from '../../helpers/getTime';

import classes from './WeatherHourly.module.css';

const WeatherHourly = ({ weatherData, reloadHandler }) => {
  if (weatherData.hourly !== undefined) {
    const hourlyData = weatherData.hourly
      .map((hour) => {
        return {
          temp: Math.round(hour.temp),
        };
      })
      .slice(0, 5);
    console.log(hourlyData);

    const nextFiveHours = ['Now'];
    for (let i = 1; i <= 5; i++) {
      nextFiveHours.push(`${getTime(i, 2)}:00`);
    }

    const currentTime = getTime();

    return (
      <Card
        title={`Hourly Forecast at ${currentTime}`}
        body={
          <div className={classes['hourly']}>
            {hourlyData.map((data, index) => {
              return (
                <div className={classes['hour']} key={index}>
                  <h2 className={classes['hour__title']}>
                    {nextFiveHours[index]}
                  </h2>
                  <p className={classes['hour__temp']}>{data.temp}&#176;</p>
                </div>
              );
            })}
          </div>
        }
        reloadHandler={reloadHandler}
      />
    );
  } else {
    return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
  }
};

export default WeatherHourly;
