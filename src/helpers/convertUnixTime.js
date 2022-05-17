const convertUnixTime = (unixTime, digits) => {
  const unixTimeMilliseconds = unixTime * 1000;
  const time = new Date(unixTimeMilliseconds);

  const convertTimeToString = () => {
    switch (digits) {
      case 4:
        return time.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        });
      case 2:
        return time.toLocaleTimeString('en-GB', {
          hour: '2-digit',
        });
      default:
        throw Error('"digits" must be either 2 or 4.');
    }
  };

  const convertedTime = convertTimeToString();

  return convertedTime;
};

export default convertUnixTime;
