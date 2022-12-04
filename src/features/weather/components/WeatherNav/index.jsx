// Components
import { Nav, MeasurementButton, ReloadButton } from 'components';
import { WeatherSearch } from 'features/weather';

// Globals
import { ACTIONS, MEASUREMENTS } from 'features/weather';

export const WeatherNav = ({
  location,
  measurement,
  dispatch,
  setWeatherData,
}) => {
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
