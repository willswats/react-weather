const getTime = (hoursToAdd = 0, digits = 4) => {
  const hourMilliseconds = 3600000;
  const time = new Date(Date.now() + hoursToAdd * hourMilliseconds);
  let convertedTime = '';
  switch (digits) {
    case 2:
      convertedTime = time.toLocaleTimeString('en-GB', {
        hour: '2-digit',
      });
      break;
    case 4:
      convertedTime = time.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
      break;
    default:
      convertedTime = time.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
  }
  return convertedTime;
};

export default getTime;
