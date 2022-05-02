import { ACTIONS } from '../../App';
import { MEASUREMENTS } from '../../App';

import Nav from '../UI/Nav';
import MeasurementButton from '../UI/Buttons/MeasurementButton';
import ReloadButton from '../UI/Buttons/ReloadButton';
import WeatherSearch from './WeatherSearch';

const WeatherNav = ({ location, measurement, dispatch, getWeatherData }) => {
  if (location.lat !== undefined && location.lon !== undefined) {
    const { lat, lon } = location;

    const reloadHandler = async () => {
      if (measurement === MEASUREMENTS.METRIC) {
        getWeatherData(lat, lon, 'metric');
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        getWeatherData(lat, lon, 'imperial');
      }
    };

    const measurementClickHandler = async () => {
      if (measurement === MEASUREMENTS.METRIC) {
        dispatch({
          type: ACTIONS.SET_MEASUREMENT,
          payload: { measurement: MEASUREMENTS.IMPERIAL },
        });
        getWeatherData(lat, lon, 'imperial');
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        dispatch({
          type: ACTIONS.SET_MEASUREMENT,
          payload: { measurement: MEASUREMENTS.METRIC },
        });
        getWeatherData(lat, lon, 'metric');
      }
    };

    return (
      <Nav
        left={
          <>
            <MeasurementButton
              measurement={measurement}
              measurementType={MEASUREMENTS.METRIC}
              clickHandler={measurementClickHandler}
            />
            <MeasurementButton
              measurement={measurement}
              measurementType={MEASUREMENTS.IMPERIAL}
              clickHandler={measurementClickHandler}
            />
          </>
        }
        middle={<WeatherSearch />}
        right={<ReloadButton reloadHandler={reloadHandler} />}
      />
    );
  } else {
    return (
      <Nav
        left={
          <>
            <MeasurementButton measurementType={MEASUREMENTS.METRIC} />
            <MeasurementButton measurementType={MEASUREMENTS.IMPERIAL} />
          </>
        }
        middle={<WeatherSearch />}
        right={<ReloadButton />}
      />
    );
  }
};

export default WeatherNav;
