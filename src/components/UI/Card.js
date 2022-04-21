import classes from './Card.module.css';
import ReloadButton from '../UI/ReloadButton';

const Card = ({ title, body, reloadHandler }) => {
  return (
    <div className={classes['card']}>
      <div className={classes['card__top']}>
        <h1 className={classes['card__title']}>{title}</h1>
        <ReloadButton reloadHandler={reloadHandler} />
      </div>
      <div className={classes['card__body']}>{body}</div>
    </div>
  );
};

export default Card;
