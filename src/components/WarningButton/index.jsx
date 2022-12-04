import styles from './styles.module.css';

export const WarningButton = ({ clickHandler, alerts }) => {
  return (
    <button onClick={clickHandler} className={styles['warning-btn']}>
      {alerts.length < 2 ? 'Warning!' : 'Warnings!'}
    </button>
  );
};
