import { ACTIONS } from '../../App';
import { MEASUREMENTS } from '../../App';

import Nav from '../UI/Nav';

import MeasurementButton from '../UI/Buttons/MeasurementButton';
import WeatherSearch from './WeatherSearch';
import ReloadButton from '../UI/Buttons/ReloadButton';

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
    const reloadHandler = () => {
      dispatch({ type: ACTIONS.RESET });
    };

    const measurementClickHandler = () => {
      if (measurement === MEASUREMENTS.METRIC) {
        dispatch({
          type: ACTIONS.SET_MEASUREMENT,
          payload: { measurement: MEASUREMENTS.IMPERIAL },
        });
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        dispatch({
          type: ACTIONS.SET_MEASUREMENT,
          payload: { measurement: MEASUREMENTS.METRIC },
        });
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
  }
};

export default WeatherNav;
