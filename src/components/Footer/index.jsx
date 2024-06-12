import SvgGitHub from 'assets/github-fill.svg?react';

import styles from './styles.module.css';

export const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <a
        href="https://www.github.com/willswats/react-weather"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SvgGitHub />
      </a>
      <a
        href="https://williamwatson.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        williamwatson.dev
      </a>
    </footer>
  );
};
