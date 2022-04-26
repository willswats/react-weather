import classes from './Bar.module.css';
import ReloadButton from './ReloadButton';
import MeasurementButton from './MeasurementButton';

const Bar = ({ title, reloadHandler, measurement, measurementHandler }) => {
  return (
    <div className={classes['bar']}>
      <div className={classes['bar__measurement-btn']}>
        {measurementHandler && (
          <MeasurementButton
            measurement={measurement}
            measurementHandler={measurementHandler}
          />
        )}
      </div>
      <h1 className={classes['bar__title']}>{title}</h1>
      <div className={classes['bar__reload-btn']}>
        {reloadHandler && <ReloadButton reloadHandler={reloadHandler} />}
      </div>
    </div>
  );
};

export default Bar;
