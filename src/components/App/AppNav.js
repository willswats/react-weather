import { ACTIONS } from '../../App';
import { MEASUREMENTS } from '../../App';

import Nav from '../UI/Nav';
import MeasurementButton from '../UI/Buttons/MeasurementButton';
import ReloadButton from '../UI/Buttons/ReloadButton';
import WeatherSearch from './AppNavSearch';

const AppNav = ({ location, measurement, dispatch, setWeatherData }) => {
  if (
    location !== undefined &&
    location.lat !== undefined &&
    location.lon !== undefined
  ) {
    const { lat, lon } = location;

    const reloadHandler = async () => {
      measurement === MEASUREMENTS.METRIC
        ? setWeatherData(lat, lon, 'metric')
        : setWeatherData(lat, lon, 'imperial');
    };

    const measurementClickHandler = async () => {
      if (measurement === MEASUREMENTS.METRIC) {
        dispatch({
          type: ACTIONS.SET_MEASUREMENT,
          payload: { measurement: MEASUREMENTS.IMPERIAL },
        });
        setWeatherData(lat, lon, 'imperial');
      } else {
        dispatch({
          type: ACTIONS.SET_MEASUREMENT,
          payload: { measurement: MEASUREMENTS.METRIC },
        });
        setWeatherData(lat, lon, 'metric');
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
        middle={
          <WeatherSearch
            measurement={measurement}
            dispatch={dispatch}
            setWeatherData={setWeatherData}
          />
        }
        right={<ReloadButton reloadHandler={reloadHandler} />}
      />
    );
  } else {
    const measurementClickHandler = () => {
      if (measurement === MEASUREMENTS.METRIC) {
        dispatch({
          type: ACTIONS.SET_MEASUREMENT,
          payload: { measurement: MEASUREMENTS.IMPERIAL },
        });
      } else {
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
        middle={
          <WeatherSearch
            measurement={measurement}
            dispatch={dispatch}
            setWeatherData={setWeatherData}
          />
        }
        right={<ReloadButton />}
      />
    );
  }
};

export default AppNav;
