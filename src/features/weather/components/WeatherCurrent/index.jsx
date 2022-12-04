// Componentsstyles
import { Card, LoadingSpinner } from 'components';

// Utils
import { getTime } from 'features/weather';

// Globals
import { MEASUREMENTS } from 'features/weather';

// Assets
import { ReactComponent as IconSunrise } from 'assets/sunrise.svg';
import { ReactComponent as IconSunset } from 'assets/sunset.svg';
import { ReactComponent as IconSun } from 'assets/sun-line.svg';
import { ReactComponent as IconWind } from 'assets/windy-line.svg';
import { ReactComponent as IconRain } from 'assets/rainy-line.svg';
import { ReactComponent as IconTemp } from 'assets/temp-hot-line.svg';
import { ReactComponent as IconDrop } from 'assets/drop-line.svg';
import { ReactComponent as IconDropHalf } from 'assets/contrast-drop-2-line.svg';
import { ReactComponent as IconEye } from 'assets/eye-line.svg';
import { ReactComponent as IconArrowUpDown } from 'assets/arrow-up-down-line.svg';

import styles from './styles.module.css';

export const WeatherCurrent = ({ weather, measurement }) => {
  if (
    weather !== undefined &&
    weather.current !== undefined &&
    weather.timezone !== undefined
  ) {
    const { current } = weather;

    const sunrise = getTime(current.sunrise, weather.timeZone, 4);
    const sunset = getTime(current.sunset, weather.timeZone, 4);
    const uvi = `${Math.round(current.uvi)}/10`;
    const windSpeed =
      measurement === MEASUREMENTS.METRIC
        ? `${Math.round(current.wind_speed * 3.6)}km/h`
        : `${Math.round(current.wind_speed)}mph`;
    const rain =
      measurement === MEASUREMENTS.METRIC
        ? `${current.rain ? current.rain['1h'].toFixed(2) : 0}mm`
        : `${current.rain ? (current.rain['1h'] / 25.4).toFixed(2) : 0}in`;
    const feelsLike = Math.round(current.feels_like);
    const humidity = `${Math.round(current.humidity)}%`;
    const dewPoint = `${Math.round(current.dew_point)}`;
    const visibility =
      measurement === MEASUREMENTS.METRIC
        ? `${Math.round(current.visibility / 1000)}km`
        : `${Math.round((current.visibility / 1000) * 0.6213712)}mi`;
    const pressure =
      measurement === MEASUREMENTS.METRIC
        ? `${Math.round(current.pressure)}mb`
        : `${(current.pressure * 0.0295).toFixed(2)}in`;

    return (
      <Card
        title={`Current Weather`}
        body={
          <>
            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <IconSunrise className={styles['item__svg']} />
                <p className={styles['item__text']}>Sunrise</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{sunrise}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <IconSunset className={styles['item__svg']} />
                <p className={styles['item__text']}>Sunset</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{sunset}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <IconSun className={styles['item__svg']} />
                <p className={styles['item__text']}>UV Index</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{uvi}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <IconWind className={styles['item__svg']} />
                <p className={styles['item__text']}>Wind Speed</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{windSpeed}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <IconRain className={styles['item__svg']} />
                <p className={styles['item__text']}>Rain</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{rain}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <IconTemp className={styles['item__svg']} />
                <p className={styles['item__text']}>Feels Like</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{feelsLike}&#176;</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <IconDrop className={styles['item__svg']} />
                <p className={styles['item__text']}>Humidity</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{humidity}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <IconDropHalf className={styles['item__svg']} />
                <p className={styles['item__text']}>Dew Point</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{dewPoint}&#176;</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <IconEye className={styles['item__svg']} />
                <p className={styles['item__text']}>Visibility</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{visibility}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <IconArrowUpDown className={styles['item__svg']} />
                <p className={styles['item__text']}>Pressure</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{pressure}</p>
              </div>
            </div>
          </>
        }
      />
    );
  } else {
    return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
  }
};
