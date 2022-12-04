import styles from './styles.module.css';

// Assets
import { ReactComponent as SvgCelsius } from 'assets/celsius-line.svg';
import { ReactComponent as SvgFahrenheit } from 'assets/fahrenheit-line.svg';

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
