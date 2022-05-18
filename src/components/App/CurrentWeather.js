import { ReactComponent as IconSunrise } from '../../svgs/sunrise.svg';
import { ReactComponent as IconSunset } from '../../svgs/sunset.svg';
import { ReactComponent as IconSun } from '../../svgs/sun-line.svg';
import { ReactComponent as IconWind } from '../../svgs/windy-line.svg';
import { ReactComponent as IconRain } from '../../svgs/rainy-line.svg';
import { ReactComponent as IconTemp } from '../../svgs/temp-hot-line.svg';
import { ReactComponent as IconDrop } from '../../svgs/drop-line.svg';
import { ReactComponent as IconDropHalf } from '../../svgs/contrast-drop-2-line.svg';
import { ReactComponent as IconEye } from '../../svgs/eye-line.svg';
import { ReactComponent as IconArrowUpDown } from '../../svgs/arrow-up-down-line.svg';

import { MEASUREMENTS } from '../../App';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

import getTime from '../../helpers/getTime';

import classes from './CurrentWeather.module.css';

const CurrentWeather = ({ weather, measurement }) => {
  if (
    weather !== undefined &&
    weather.current !== undefined &&
    weather.timezone !== undefined
  ) {
    const { current } = weather;

    const sunrise = getTime(current.sunrise, weather.timeZone, 4);
    const sunset = getTime(current.sunset, weather.timeZone, 4);
    const uvi = Math.round(current.uvi);
    const windSpeed = Math.round(current.wind_speed);
    const rain = current.rain ? current.rain['1h'] : '0';
    const feelsLike = Math.round(current.feels_like);
    const humidity = current.humidity;
    const dewPoint = Math.round(current.dew_point);
    const visibility = current.visibility;
    const pressure = current.pressure;

    return (
      <Card
        title={`Current Weather`}
        body={
          <div className={classes['extra']}>
            <div className={classes['extra__item']}>
              <p className={classes['extra__title']}>
                <IconSunrise className={classes['extra__svg']} />
                Sunrise
              </p>
              <p className={classes['extra__info']}>{sunrise}</p>
            </div>

            <div className={classes['extra__item']}>
              <p className={classes['extra__title']}>
                <IconSunset className={classes['extra__svg']} />
                Sunset
              </p>
              <p className={classes['extra__info']}>{sunset}</p>
            </div>

            <div className={classes['extra__item']}>
              <p className={classes['extra__title']}>
                <IconSun className={classes['extra__svg']} />
                UV Index
              </p>
              <p className={classes['extra__info']}>{uvi}/10</p>
            </div>

            <div className={classes['extra__item']}>
              <p className={classes['extra__title']}>
                <IconWind className={classes['extra__svg']} />
                Wind Speed
              </p>
              <p className={classes['extra__info']}>
                {windSpeed}
                {measurement === MEASUREMENTS.METRIC ? 'm/s' : 'mph'}
              </p>
            </div>

            <div className={classes['extra__item']}>
              <p className={classes['extra__title']}>
                <IconRain className={classes['extra__svg']} />
                Rain
              </p>
              <p className={classes['extra__info']}>{rain}mm</p>
            </div>

            <div className={classes['extra__item']}>
              <p className={classes['extra__title']}>
                <IconTemp className={classes['extra__svg']} />
                Feels Like
              </p>
              <p className={classes['extra__info']}>{feelsLike}&#176;</p>
            </div>

            <div className={classes['extra__item']}>
              <p className={classes['extra__title']}>
                <IconDrop className={classes['extra__svg']} />
                Humidity
              </p>
              <p className={classes['extra__info']}>{humidity}%</p>
            </div>

            <div className={classes['extra__item']}>
              <p className={classes['extra__title']}>
                <IconDropHalf className={classes['extra__svg']} />
                Dew Point
              </p>
              <p className={classes['extra__info']}>{dewPoint}&#176;</p>
            </div>

            <div className={classes['extra__item']}>
              <p className={classes['extra__title']}>
                <IconEye className={classes['extra__svg']} />
                Visibility
              </p>
              <p className={classes['extra__info']}>{visibility}m</p>
            </div>

            <div className={classes['extra__item']}>
              <p className={classes['extra__title']}>
                <IconArrowUpDown className={classes['extra__svg']} />
                Pressure
              </p>
              <p className={classes['extra__info']}>{pressure}hPa</p>
            </div>
          </div>
        }
      />
    );
  } else {
    return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
  }
};

export default CurrentWeather;
