import styles from './styles.module.css';

import { ReactComponent as SvgRefresh } from 'assets/refresh-line.svg';

export const ReloadButton = ({ reloadHandler }) => {
  return (
    <button className={styles['reload-btn']} onClick={reloadHandler}>
      <SvgRefresh className={styles['svg']} />
    </button>
  );
};
