import classes from './MeasurementButton.module.css';
import { MEASUREMENTS } from '../../App';

const MeasurementButton = ({ measurement, measurementHandler }) => {
  return (
    <button className={classes['measurement-btn']} onClick={measurementHandler}>
      {measurement === MEASUREMENTS.METRIC ? 'Imperial' : 'Metric'}
    </button>
  );
};

export default MeasurementButton;
