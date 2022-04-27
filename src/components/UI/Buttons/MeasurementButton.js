import classes from './MeasurementButton.module.css';
import { MEASUREMENTS } from '../../../App';

const MeasurementButton = ({
  measurement,
  measurementHandler,
  buttonMeasurement,
}) => {
  return (
    <button
      className={`${classes['measurement-btn']} ${' '} ${
        measurement === buttonMeasurement
          ? classes['measurement-btn--selected']
          : ''
      }`}
      onClick={measurementHandler}
    >
      <span
        className={`
    ${
      buttonMeasurement === MEASUREMENTS.METRIC
        ? classes['measurement-btn__celcius']
        : ''
    }
    ${
      buttonMeasurement === MEASUREMENTS.IMPERIAL
        ? classes['measurement-btn__fahrenheit']
        : ''
    }
    `}
      ></span>
    </button>
  );
};

export default MeasurementButton;
