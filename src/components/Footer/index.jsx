import styles from './styles.module.css';

export const Footer = ({ body }) => {
  return <footer className={styles['footer']}>{body}</footer>;
};
