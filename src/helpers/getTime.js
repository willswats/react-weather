const getTime = (hoursToAdd = 0, digits = 4, timeZone) => {
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
        throw new Error(
          `"digits" cannot be ${digits}. "digits" must be either 2 or 4.`
        );
    }
  };
  const convertedTime = convertTime();

  return convertedTime;
};

export default getTime;
