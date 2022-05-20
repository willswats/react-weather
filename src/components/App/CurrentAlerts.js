import { useState } from 'react';

import { ReactComponent as IconCross } from '../../svgs/close-line.svg';

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
            body={
              <Card
                title={'Current Alerts'}
                end={
                  <IconCross onClick={hideModal} className={classes['cross']} />
                }
                body={alerts.map((alert, index) => {
                  const eventName = capitaliseFirstLetters(alert.event);
                  const start = getTime(alert.start, timezone, 4);
                  const end = getTime(alert.end, timezone, 4);

                  return (
                    <p key={index} className={classes['alert']}>
                      {eventName} at {start} - {end}
                    </p>
                  );
                })}
              />
            }
          />
        )}
      </>
    );
  }
};

export default AlertsButton;
