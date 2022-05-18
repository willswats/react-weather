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
    const visibility = current.visibility / 1000;
    const pressure = current.pressure;

    return (
      <Card
        title={`Current Weather`}
        body={
          <div className={classes['current']}>
            <div className={classes['current__item']}>
              <p className={classes['current__title']}>
                <IconSunrise className={classes['current__svg']} />
                Sunrise
              </p>
              <p className={classes['current__info']}>{sunrise}</p>
            </div>

            <div className={classes['current__item']}>
              <p className={classes['current__title']}>
                <IconSunset className={classes['current__svg']} />
                Sunset
              </p>
              <p className={classes['current__info']}>{sunset}</p>
            </div>

            <div className={classes['current__item']}>
              <p className={classes['current__title']}>
                <IconSun className={classes['current__svg']} />
                UV Index
              </p>
              <p className={classes['current__info']}>{uvi}/10</p>
            </div>

            <div className={classes['current__item']}>
              <p className={classes['current__title']}>
                <IconWind className={classes['current__svg']} />
                Wind Speed
              </p>
              <p className={classes['current__info']}>
                {windSpeed}
                {measurement === MEASUREMENTS.METRIC ? 'm/s' : 'mph'}
              </p>
            </div>

            <div className={classes['current__item']}>
              <p className={classes['current__title']}>
                <IconRain className={classes['current__svg']} />
                Rain
              </p>
              <p className={classes['current__info']}>{rain}mm</p>
            </div>

            <div className={classes['current__item']}>
              <p className={classes['current__title']}>
                <IconTemp className={classes['current__svg']} />
                Feels Like
              </p>
              <p className={classes['current__info']}>{feelsLike}&#176;</p>
            </div>

            <div className={classes['current__item']}>
              <p className={classes['current__title']}>
                <IconDrop className={classes['current__svg']} />
                Humidity
              </p>
              <p className={classes['current__info']}>{humidity}%</p>
            </div>

            <div className={classes['current__item']}>
              <p className={classes['current__title']}>
                <IconDropHalf className={classes['current__svg']} />
                Dew Point
              </p>
              <p className={classes['current__info']}>{dewPoint}&#176;</p>
            </div>

            <div className={classes['current__item']}>
              <p className={classes['current__title']}>
                <IconEye className={classes['current__svg']} />
                Visibility
              </p>
              <p className={classes['current__info']}>{visibility}km</p>
            </div>

            <div className={classes['current__item']}>
              <p className={classes['current__title']}>
                <IconArrowUpDown className={classes['current__svg']} />
                Pressure
              </p>
              <p className={classes['current__info']}>{pressure}hPa</p>
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
