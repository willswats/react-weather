import styles from './styles.module.css';

import SvgRefresh from 'assets/refresh-line.svg?react';

export const ReloadButton = ({ reloadHandler }) => {
  return (
    <button className={styles['reload-btn']} onClick={reloadHandler}>
      <SvgRefresh className={styles['svg']} />
    </button>
  );
};
