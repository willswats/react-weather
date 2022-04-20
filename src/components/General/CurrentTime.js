const CurrentTime = () => {
  const current = new Date();
  const time = current.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return <>{time}</>;
};

export default CurrentTime;
