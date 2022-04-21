import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getTime from '../../helpers/getTime';

import classes from './WeatherHourly.module.css';

const WeatherHourly = ({ weatherData }) => {
  if (weatherData.hourly !== undefined) {
    const hourlyData = weatherData.hourly
      .map((hour) => {
        return {
          temp: Math.round(hour.temp),
        };
      })
      .slice(0, 5);

    const timesArr = ['Now'];
    for (let i = 1; i <= 5; i++) {
      timesArr.push(`${getTime(i, 2)}:00`);
    }

    return (
      <Card
        title={'Hourly Forecast'}
        body={
          <div className={classes['hourly']}>
            {hourlyData.map((data, index) => {
              return (
                <div className={classes['hour']} key={index}>
                  <h2 className={classes['hour__title']}>{timesArr[index]}</h2>
                  <p className={classes['hour__temp']}>{data.temp}&#176;</p>
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
