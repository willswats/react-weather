import styles from './styles.module.css';

export const ReloadButton = ({ reloadHandler }) => {
  return (
    <button className={styles['reload-btn']} onClick={reloadHandler}>
      &#8635;
    </button>
  );
};
