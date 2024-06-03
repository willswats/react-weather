import styles from './styles.module.css';

// Assets
import SvgCelsius from 'assets/celsius-line.svg?react';
import SvgFahrenheit from 'assets/fahrenheit-line.svg?react';

// Globals
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
      {measurementType === MEASUREMENTS.METRIC && (
        <SvgCelsius className={styles['svg']} />
      )}
      {measurementType === MEASUREMENTS.IMPERIAL && (
        <SvgFahrenheit className={styles['svg']} />
      )}
    </button>
  );
};
