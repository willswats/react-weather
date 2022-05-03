const getTime = (digits, timeZone, hoursToAdd = 0) => {
  const hourMilliseconds = 3600000;
  const time = new Date(Date.now() + hoursToAdd * hourMilliseconds);
  const convertTime = () => {
    switch (digits) {
      case 4:
        return time.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: timeZone,
        });
      case 2:
        return time.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          timeZone: timeZone,
        });
      default:
        throw Error('"digits" must be either 2 or 4.');
    }
  };
  const convertedTime = convertTime();

  return convertedTime;
};

export default getTime;
