import classes from './ModalButton.module.css';

const ModalButton = ({ type, clickHandler, text, alerts }) => {
  switch (type) {
    case 'warning':
      if (alerts !== undefined) {
        return (
          <button onClick={clickHandler} className={classes['modal-btn']}>
            {alerts.length < 2 ? 'Warning!' : 'Warnings!'}
          </button>
        );
      }
      break;
    default:
      return (
        <button onClick={clickHandler} className={classes['modal-btn']}>
          {text}
        </button>
      );
  }
};

export default ModalButton;
