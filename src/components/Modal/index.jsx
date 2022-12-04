import ReactDom from 'react-dom';

import styles from './styles.module.css';

export const Modal = ({ hideHandler, body }) => {
  return ReactDom.createPortal(
    <>
      <div onClick={hideHandler} className={styles['overlay']} />
      <div className={styles['body']}>{body}</div>
    </>,
    document.getElementById('modal')
  );
};
