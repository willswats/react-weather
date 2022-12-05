// Components
import { Card, LoadingSpinner } from 'components';

// Utils
import { getTime } from 'features/weather';

// Globals
import { MEASUREMENTS } from 'features/weather';

// Assets
import { ReactComponent as SvgSunrise } from 'assets/sunrise.svg';
import { ReactComponent as SvgSunset } from 'assets/sunset.svg';
import { ReactComponent as SvgSun } from 'assets/sun-line.svg';
import { ReactComponent as SvgWind } from 'assets/windy-line.svg';
import { ReactComponent as SvgRain } from 'assets/rainy-line.svg';
import { ReactComponent as SvgTemp } from 'assets/temp-hot-line.svg';
import { ReactComponent as SvgDrop } from 'assets/drop-line.svg';
import { ReactComponent as SvgDropHalf } from 'assets/contrast-drop-2-line.svg';
import { ReactComponent as SvgEye } from 'assets/eye-line.svg';
import { ReactComponent as SvgArrowUpDown } from 'assets/arrow-up-down-line.svg';

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
                <SvgSunrise className={styles['item__svg']} />
                <p className={styles['item__text']}>Sunrise</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{sunrise}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <SvgSunset className={styles['item__svg']} />
                <p className={styles['item__text']}>Sunset</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{sunset}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <SvgSun className={styles['item__svg']} />
                <p className={styles['item__text']}>UV Index</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{uvi}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <SvgWind className={styles['item__svg']} />
                <p className={styles['item__text']}>Wind Speed</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{windSpeed}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <SvgRain className={styles['item__svg']} />
                <p className={styles['item__text']}>Rain</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{rain}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <SvgTemp className={styles['item__svg']} />
                <p className={styles['item__text']}>Feels Like</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{feelsLike}&#176;</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <SvgDrop className={styles['item__svg']} />
                <p className={styles['item__text']}>Humidity</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{humidity}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <SvgDropHalf className={styles['item__svg']} />
                <p className={styles['item__text']}>Dew Point</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{dewPoint}&#176;</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <SvgEye className={styles['item__svg']} />
                <p className={styles['item__text']}>Visibility</p>
              </div>
              <div className={styles['item__end']}>
                <p className={styles['item__text']}>{visibility}</p>
              </div>
            </div>

            <div className={styles['item']}>
              <div className={styles['item__start']}>
                <SvgArrowUpDown className={styles['item__svg']} />
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
