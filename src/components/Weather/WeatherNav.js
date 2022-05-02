import { ACTIONS } from '../../App';
import { MEASUREMENTS } from '../../App';

import Nav from '../UI/Nav';

import MeasurementButton from '../UI/Buttons/MeasurementButton';
import WeatherSearch from './WeatherSearch';
import ReloadButton from '../UI/Buttons/ReloadButton';

const WeatherNav = ({ measurement, dispatch }) => {
  const reloadHandler = async () => {
    dispatch({ type: ACTIONS.RELOAD });
  };

  const measurementClickHandler = async () => {
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
    dispatch({ type: ACTIONS.RELOAD });
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
};

export default WeatherNav;
