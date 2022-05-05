import classes from './List.module.css';

const List = ({ items }) => {
  if (items.length > 0) {
    return (
      <div className={classes['list']}>
        {items.map((item, index) => {
          return (
            <button key={index} className={classes['list__item']}>
              {item.name}, {item.country}
            </button>
          );
        })}
      </div>
    );
  }
};

export default List;
