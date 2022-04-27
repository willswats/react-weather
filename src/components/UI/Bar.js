import classes from './Bar.module.css';
import ReloadButton from './Buttons/ReloadButton';
import MeasurementButton from './Buttons/MeasurementButton';

import { MEASUREMENTS } from '../../App';

const Bar = ({ middle, reloadHandler, measurement, measurementHandler }) => {
  return (
    <div className={classes['bar']}>
      <div className={classes['bar__measurement-btns']}>
        {measurementHandler && (
          <MeasurementButton
            measurement={measurement}
            measurementHandler={measurementHandler}
            buttonMeasurement={MEASUREMENTS.METRIC}
          />
        )}
        {measurementHandler && (
          <MeasurementButton
            measurement={measurement}
            measurementHandler={measurementHandler}
            buttonMeasurement={MEASUREMENTS.IMPERIAL}
          />
        )}
      </div>
      <div className={classes['bar__middle']}>{middle}</div>
      <div className={classes['bar__reload-btn']}>
        {reloadHandler && <ReloadButton reloadHandler={reloadHandler} />}
      </div>
    </div>
  );
};

export default Bar;
