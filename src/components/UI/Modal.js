import ReactDom from 'react-dom';

import classes from './Modal.module.css';

const Overlay = ({ hideHandler, body }) => {
  return ReactDom.createPortal(
    <>
      <div onClick={hideHandler} className={classes['overlay']} />
      <div className={classes['body']}>{body}</div>
    </>,
    document.getElementById('modal')
  );
};

export default Overlay;
