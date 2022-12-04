import styles from './styles.module.css';
import { MEASUREMENTS } from 'features/weather';

export const MeasurementButton = ({
  measurement,
  measurementType,
  clickHandler,
}) => {
  return (
    <button
      className={`${styles['measurement-btn']} ${' '} ${
        measurement === measurementType
          ? styles['measurement-btn--selected']
          : ''
      }`}
      onClick={clickHandler}
    >
      <span
        className={`
    ${
      measurementType === MEASUREMENTS.METRIC
        ? styles['measurement-btn__celcius']
        : ''
    }
    ${
      measurementType === MEASUREMENTS.IMPERIAL
        ? styles['measurement-btn__fahrenheit']
        : ''
    }
    `}
      ></span>
    </button>
  );
};
