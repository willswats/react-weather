import ReactDom from 'react-dom';

import { ReactComponent as IconCross } from '../../svgs/close-line.svg';
import classes from './Modal.module.css';

const Overlay = ({ hideHandler, body }) => {
  return ReactDom.createPortal(
    <>
      <div onClick={hideHandler} className={classes['overlay']} />
      <IconCross onClick={hideHandler} className={classes['cross']} />
      <div className={classes['body']}>{body}</div>
    </>,
    document.getElementById('modal')
  );
};

export default Overlay;
