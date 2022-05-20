import classes from './WarningButton.module.css';

const WarningButton = ({ clickHandler, alerts }) => {
  return (
    <button onClick={clickHandler} className={classes['warning-btn']}>
      {alerts.length < 2 ? 'Warning!' : 'Warnings!'}
    </button>
  );
};

export default WarningButton;
