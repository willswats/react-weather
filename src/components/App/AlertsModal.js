import getTime from '../../helpers/getTime';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import Card from '../UI/Card';
import Overlay from '../UI/Overlay';

import classes from './AlertsModal.module.css';

const AlertsModal = ({ alerts, timezone, overlayClickHandler }) => {
  if (alerts !== undefined && timezone !== undefined) {
    return (
      <>
        <Overlay clickHandler={overlayClickHandler} />
        <div className={classes['cards']}>
          {alerts.map((alert, index) => {
            const eventName = capitaliseFirstLetters(alert.event);
            const start = getTime(alert.start, timezone, 4);
            const end = getTime(alert.end, timezone, 4);
            const description = alert.description;

            return (
              <Card
                key={index}
                title={`${eventName} from ${start} until ${end}`}
                body={
                  <p className={classes['cards__description']}>{description}</p>
                }
              />
            );
          })}
        </div>
      </>
    );
  }
};

export default AlertsModal;
