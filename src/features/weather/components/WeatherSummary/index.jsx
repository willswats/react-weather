// Components
import { Card, LoadingSpinner } from 'components';
import { WeatherAlertsButton } from 'features/weather';

// Utils
import { capitaliseFirstLetters, getTime } from 'features/weather';

import styles from './styles.module.css';

export const WeatherSummary = ({ weather, location }) => {
  if (
    weather !== undefined &&
    weather.current !== undefined &&
    weather.timezone !== undefined &&
    location !== undefined &&
    location.name !== undefined &&
    location.country !== undefined
  ) {
    const { current } = weather;
    const { name, country } = location;

    const temperature = Math.round(current.temp);
    const description = capitaliseFirstLetters(current.weather[0].description);
    const icon = current.weather[0].icon;

    const time = getTime(current.dt, weather.timezone, 4);

    return (
      <Card
        title={`${name}, ${country} at ${time}`}
        end={<WeatherAlertsButton weather={weather} />}
        body={
          <>
            <div className="horizontal">
              <div className={styles['start']}>
                <p className={styles['start__temperature']}>
                  {temperature}&#176;
                </p>
                <p className={styles['start__description']}>{description}</p>
              </div>
              <div className={styles['end']}>
                <img
                  className={styles['end__img']}
                  src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                  alt={`${description}`}
                ></img>
              </div>
            </div>
          </>
        }
      />
    );
  } else return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
};
