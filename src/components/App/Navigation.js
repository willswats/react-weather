import { ACTIONS } from '../../App';
import { MEASUREMENTS } from '../../App';

import Nav from '../UI/Nav';
import MeasurementButton from '../UI/Buttons/MeasurementButton';
import ReloadButton from '../UI/Buttons/ReloadButton';
import WeatherSearch from './NavigationSearch';

const Navigation = ({ location, measurement, dispatch, setWeatherData }) => {
  if (
    location !== undefined &&
    location.lat !== undefined &&
    location.lon !== undefined
  ) {
    const { lat, lon } = location;

    const reloadHandler = async () => {
      if (measurement === MEASUREMENTS.METRIC) {
        setWeatherData(lat, lon, 'metric');
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        setWeatherData(lat, lon, 'imperial');
      }
    };

    const measurementClickHandler = async () => {
      if (measurement === MEASUREMENTS.METRIC) {
        dispatch({
          type: ACTIONS.SET_MEASUREMENT,
          payload: { measurement: MEASUREMENTS.IMPERIAL },
        });
        setWeatherData(lat, lon, 'imperial');
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
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

export default Navigation;