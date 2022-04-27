import classes from './Card.module.css';
import ReloadButton from './Buttons/ReloadButton';

const Card = ({ title, body, reloadHandler }) => {
  return (
    <div className={classes['card']}>
      <div className={classes['card__top']}>
        <h1 className={classes['card__title']}>{title}</h1>
        <div className={classes['card__reload-btn']}>
          {reloadHandler && <ReloadButton reloadHandler={reloadHandler} />}
        </div>
      </div>
      <div className={classes['card__body']}>{body}</div>
    </div>
  );
};

export default Card;
