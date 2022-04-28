import { ACTIONS } from '../../App';
import { MEASUREMENTS } from '../../App';

import Nav from '../UI/Nav';
import LoadingSpinner from '../UI/LoadingSpinner';

import MeasurementButton from '../UI/Buttons/MeasurementButton';
import WeatherSearch from './WeatherSearch';
import ReloadButton from '../UI/Buttons/ReloadButton';

import { fetchWeatherData } from '../../helpers/api';

const WeatherNav = ({ location, measurement, dispatch }) => {
  if (location !== undefined) {
    const { lat, lon } = location;

    const reloadHandler = async () => {
      dispatch({ type: ACTIONS.RESET_WEATHER });
      if (measurement === MEASUREMENTS.METRIC) {
        const data = await fetchWeatherData(lat, lon, 'metric');
        dispatch({ type: ACTIONS.SET_WEATHER, payload: { data } });
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        const data = await fetchWeatherData(lat, lon, 'imperial');
        dispatch({ type: ACTIONS.SET_WEATHER, payload: { data } });
      }
    };

    const measurementClickHandler = async () => {
      if (measurement === MEASUREMENTS.METRIC) {
        dispatch({
          type: ACTIONS.SET_MEASUREMENT,
          payload: { measurement: MEASUREMENTS.IMPERIAL },
        });
        dispatch({ type: ACTIONS.RESET_WEATHER });
        const data = await fetchWeatherData(lat, lon, 'imperial');
        dispatch({ type: ACTIONS.SET_WEATHER, payload: { data } });
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        dispatch({
          type: ACTIONS.SET_MEASUREMENT,
          payload: { measurement: MEASUREMENTS.METRIC },
        });
        dispatch({ type: ACTIONS.RESET_WEATHER });
        const data = await fetchWeatherData(lat, lon, 'metric');
        dispatch({ type: ACTIONS.SET_WEATHER, payload: { data } });
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
  } else
    return (
      <Nav
        left={<LoadingSpinner />}
        middle={<LoadingSpinner />}
        right={<LoadingSpinner />}
      />
    );
};

export default WeatherNav;
