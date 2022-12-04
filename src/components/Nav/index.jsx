import styles from './styles.module.css';

export const Nav = ({ left, middle, right }) => {
  return (
    <nav className={styles['nav']}>
      <div className={styles['nav__left']}>{left}</div>
      <div className={styles['nav__middle']}>{middle}</div>
      <div className={styles['nav__right']}>{right}</div>
    </nav>
  );
};
