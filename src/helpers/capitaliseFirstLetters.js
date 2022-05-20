const capitaliseFirstLetters = (sentence) => {
  sentence = sentence.split(' ');

  for (let i = 0; i < sentence.length; i++) {
    try {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].substr(1);
    } catch {
      continue;
    }
  }

  sentence = sentence.join(' ');

  return sentence;
};

export default capitaliseFirstLetters;
