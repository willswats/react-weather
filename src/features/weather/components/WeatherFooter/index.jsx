// Components
import { Footer } from 'components';

// Assets
import { ReactComponent as IconGitHub } from 'assets/github-fill.svg';

import styles from './styles.module.css';

export const WeatherFooter = () => {
  return (
    <Footer
      body={
        <>
          <a
            className={styles['item']}
            href="https://www.github.com/willswats/react-weather"
          >
            <IconGitHub className={styles['icon']} />
          </a>
          <a className={styles['item']} href="https://williamwatson.dev">
            williamwatson.dev
          </a>
        </>
      }
    />
  );
};
