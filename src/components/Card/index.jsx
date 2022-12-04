import styles from './styles.module.css';

export const Card = ({ title, end, body, error }) => {
  return (
    <div className={styles['card']}>
      <div className={styles['card__top']}>
        <h1 className={styles['card__title']}>{title}</h1>
        {end}
      </div>
      <div className={styles['card__body']}>
        {body}
        {error && <p className={styles['card__error']}>{error}</p>}
      </div>
    </div>
  );
};
