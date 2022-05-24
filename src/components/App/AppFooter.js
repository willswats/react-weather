import classes from './AppFooter.module.css';

import Footer from '../UI/Footer';

import { ReactComponent as IconGitHub } from '../../svgs/github-fill.svg';

const AppFooter = () => {
  return (
    <Footer
      body={
        <>
          <a
            className={classes['item']}
            href="https://www.github.com/willswats/react-weather"
          >
            <IconGitHub className={classes['icon']} />
          </a>
          <a className={classes['item']} href="https://williamwatson.dev">
            williamwatson.dev
          </a>
        </>
      }
    />
  );
};

export default AppFooter;
