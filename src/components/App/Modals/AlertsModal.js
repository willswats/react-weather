import getTime from '../../../helpers/getTime';
import capitaliseFirstLetters from '../../../helpers/capitaliseFirstLetters';

import Card from '../../UI/Card';
import Modal from '../../UI/Modal';

import classes from './AlertsModal.module.css';

const AlertsModal = ({ alerts, timezone, hideHandler }) => {
  if (alerts !== undefined && timezone !== undefined) {
    return (
      <Modal
        hideHandler={hideHandler}
        body={alerts.map((alert, index) => {
          const eventName = capitaliseFirstLetters(alert.event);
          const start = getTime(alert.start, timezone, 4);
          const end = getTime(alert.end, timezone, 4);
          const description = alert.description;

          return (
            <div key={index}>
              <Card
                title={`${eventName} at ${start} - ${end}`}
                body={<p className={classes['item']}>{description}</p>}
              />
            </div>
          );
        })}
      />
    );
  }
};

export default AlertsModal;
