// Components
import { Card, LoadingSpinner } from 'components';

// Utils
import { capitaliseFirstLetters, getDay } from 'features/weather';

import styles from './styles.module.css';

export const WeatherDaily = ({ weather }) => {
  if (weather !== undefined && weather.daily !== undefined) {
    const { daily } = weather;

    return (
      <Card
        title={`Daily Forecast`}
        body={
          <div className={styles['daily']}>
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
                <div className={`${styles['daily__item']}`} key={index}>
                  <h2 className={styles['daily__title']}>{title}</h2>
                  <p className={styles['daily__max']}>{maxTemp}&#176;</p>
                  <p className={styles['daily__min']}>{minTemp}&#176;</p>
                  <img
                    className={styles['daily__img']}
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={`${description}`}
                  ></img>
                  <p className={styles['daily__pop']}>{pop}</p>
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
