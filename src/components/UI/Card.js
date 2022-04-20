import classes from './Card.module.css';

const Card = ({ title, body }) => {
  return (
    <div className={classes['card']}>
      <div className={classes['card__top']}>
        <h1 className={classes['card__title']}>{title}</h1>
      </div>
      <div className={classes['card__body']}>{body}</div>
    </div>
  );
};

export default Card;
