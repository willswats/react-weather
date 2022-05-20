import { useState } from 'react';

import AlertsModal from '../../App/AlertsModal';

import classes from './AlertsButton.module.css';

const AlertsButton = ({ weather }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  if (weather.alerts !== undefined && weather.timezone !== undefined) {
    const { alerts } = weather;

    return (
      <>
        <button onClick={showModal} className={classes['alerts-btn']}>
          {alerts.length < 2 ? 'Warning!' : 'Warnings!'}
        </button>
        {modalVisible === true && (
          <AlertsModal
            alerts={weather.alerts}
            timezone={weather.timezone}
            hideHandler={hideModal}
          />
        )}
      </>
    );
  }
};

export default AlertsButton;
