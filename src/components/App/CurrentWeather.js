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
          <>
            <div className={classes['item']}>
              <div className={classes['item__start']}>
                <IconSunrise className={classes['item__svg']} />
                <p className={classes['item__text']}>Sunrise</p>
              </div>
              <div className={classes['item__end']}>
                <p className={classes['item__text']}>{sunrise}</p>
              </div>
            </div>

            <div className={classes['item']}>
              <div className={classes['item__start']}>
                <IconSunset className={classes['item__svg']} />
                <p className={classes['item__text']}>Sunset</p>
              </div>
              <div className={classes['item__end']}>
                <p className={classes['item__text']}>{sunset}</p>
              </div>
            </div>

            <div className={classes['item']}>
              <div className={classes['item__start']}>
                <IconSun className={classes['item__svg']} />
                <p className={classes['item__text']}>UV Index</p>
              </div>
              <div className={classes['item__end']}>
                <p className={classes['item__text']}>{uvi}/10</p>
              </div>
            </div>

            <div className={classes['item']}>
              <div className={classes['item__start']}>
                <IconWind className={classes['item__svg']} />
                <p className={classes['item__text']}>Wind Speed</p>
              </div>
              <div className={classes['item__end']}>
                <p className={classes['item__text']}>
                  {windSpeed}
                  {measurement === MEASUREMENTS.METRIC ? 'm/s' : 'mph'}
                </p>
              </div>
            </div>

            <div className={classes['item']}>
              <div className={classes['item__start']}>
                <IconRain className={classes['item__svg']} />
                <p className={classes['item__text']}>Rain</p>
              </div>
              <div className={classes['item__end']}>
                <p className={classes['item__text']}>{rain}mm</p>
              </div>
            </div>

            <div className={classes['item']}>
              <div className={classes['item__start']}>
                <IconTemp className={classes['item__svg']} />
                <p className={classes['item__text']}>Feels Like</p>
              </div>
              <div className={classes['item__end']}>
                <p className={classes['item__text']}>{feelsLike}&#176;</p>
              </div>
            </div>

            <div className={classes['item']}>
              <div className={classes['item__start']}>
                <IconDrop className={classes['item__svg']} />
                <p className={classes['item__text']}>Humidity</p>
              </div>
              <div className={classes['item__end']}>
                <p className={classes['item__text']}>{humidity}%</p>
              </div>
            </div>

            <div className={classes['item']}>
              <div className={classes['item__start']}>
                <IconDropHalf className={classes['item__svg']} />
                <p className={classes['item__text']}>Dew Point</p>
              </div>
              <div className={classes['item__end']}>
                <p className={classes['item__text']}>{dewPoint}&#176;</p>
              </div>
            </div>

            <div className={classes['item']}>
              <div className={classes['item__start']}>
                <IconEye className={classes['item__svg']} />
                <p className={classes['item__text']}>Visibility</p>
              </div>
              <div className={classes['item__end']}>
                <p className={classes['item__text']}>{visibility}km</p>
              </div>
            </div>

            <div className={classes['item']}>
              <div className={classes['item__start']}>
                <IconArrowUpDown className={classes['item__svg']} />
                <p className={classes['item__text']}>Pressure</p>
              </div>
              <div className={classes['item__end']}>
                <p className={classes['item__text']}>{pressure}hPa</p>
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

export default CurrentWeather;
