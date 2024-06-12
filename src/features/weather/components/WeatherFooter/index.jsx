// Components
import { Footer } from 'components';

// Assets
import SvgGitHub from 'assets/github-fill.svg?react';

import styles from './styles.module.css';

export const WeatherFooter = () => {
  return (
    <Footer
      body={
        <>
          <a
            className={styles['item']}
            href="https://www.github.com/willswats/react-weather"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SvgGitHub className={styles['svg']} />
          </a>
          <a
            className={styles['item']}
            href="https://williamwatson.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            williamwatson.dev
          </a>
        </>
      }
    />
  );
};
