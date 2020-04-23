import faker from 'faker';

const generateWords = (count = 15) => {
  return new Array(count)
    .fill()
    .map(index => faker.random.word())
    .join(' ');
};
// Here at first an empty array is created of length equal to count and undefined is filled in it at
// all positions and then at its each index a random word is put and later all elements of this
// array are joined using spaces to form a string of words.

export default generateWords;
