import classes from './MeasurementButton.module.css';
import { MEASUREMENTS } from '../../../App';

const MeasurementButton = ({ measurement, measurementType, clickHandler }) => {
  return (
    <button
      className={`${classes['measurement-btn']} ${' '} ${
        measurement === measurementType
          ? classes['measurement-btn--selected']
          : ''
      }`}
      onClick={clickHandler}
    >
      <span
        className={`
    ${
      measurementType === MEASUREMENTS.METRIC
        ? classes['measurement-btn__celcius']
        : ''
    }
    ${
      measurementType === MEASUREMENTS.IMPERIAL
        ? classes['measurement-btn__fahrenheit']
        : ''
    }
    `}
      ></span>
    </button>
  );
};

export default MeasurementButton;
