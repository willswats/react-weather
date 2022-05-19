import classes from './WarningButton.module.css';

const WarningButton = ({ alerts, clickHandler }) => {
  if (alerts !== undefined) {
    return (
      <button onClick={clickHandler} className={classes['warning-btn']}>
        {alerts.length < 2 ? 'Weather warning!' : 'Weather warnings!'}
      </button>
    );
  }
};

export default WarningButton;
