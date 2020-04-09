import faker from 'faker';

const generateWords = (count = 15) => {
  return new Array(count)
    .fill()
    .map(index => faker.random.word())
    .join(' ');
};

export default generateWords;
