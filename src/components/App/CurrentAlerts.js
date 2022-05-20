import { useState } from 'react';

import getTime from '../../helpers/getTime';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import Modal from '../UI/Modal';
import Card from '../UI/Card';

import WarningButton from '../UI/Buttons/WarningButton';

import classes from './CurrentAlerts.module.css';

const AlertsButton = ({ weather }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  if (weather.alerts !== undefined && weather.timezone !== undefined) {
    const { alerts, timezone } = weather;

    return (
      <>
        <WarningButton clickHandler={showModal} alerts={weather.alerts} />
        {modalVisible === true && (
          <Modal
            hideHandler={hideModal}
            body={alerts.map((alert, index) => {
              const eventName = capitaliseFirstLetters(alert.event);
              const start = getTime(alert.start, timezone, 4);
              const end = getTime(alert.end, timezone, 4);
              const description = alert.description;

              return (
                <div key={index}>
                  <Card
                    title={`${eventName} at ${start} - ${end}`}
                    body={
                      <>
                        <p className={classes['item']}>{description}</p>
                      </>
                    }
                  />
                </div>
              );
            })}
          />
        )}
      </>
    );
  }
};

export default AlertsButton;
