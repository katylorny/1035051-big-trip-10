const EVENTS_COUNT = 4;

import {getRandomArrayElement, getRandomArrayElements, getRandomNumber} from "../utils/common";

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
export const TYPES_MOVE = [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`, `trip`];
export const TYPES_STAY = [`check-in`, `restaurant`, `sightseeing`];
const TYPES = TYPES_MOVE.concat(TYPES_STAY);
export const CITIES = [`Moscow`, `Kislovodsk`, `Vinnitsa`, `Tula`, `Orel`];
const PHOTOS_MAX_COUNT = 10;
const PRICE_MAX = 100;
const PRICE_MIN = 1;


export const DESCRIPTION_ARRAY = DESCRIPTION.split(`. `);

export const generateDescription = () => { // надо шото делать с тем что может выпасть 0(((
  return getRandomArrayElements(DESCRIPTION_ARRAY, 3);
};

// const generateType = () => {
//   return getRandomArrayElement(TYPES);
// };


export const generatePhotosArray = () => {
  const photosCount = getRandomNumber(1, PHOTOS_MAX_COUNT);
  const photos = [];
  for (let i = 0; i < photosCount; i++) {
    const RANDOM_PHOTO_URL = `http://picsum.photos/300/150?r=${Math.random()}`;
    photos.push(RANDOM_PHOTO_URL);
  }
  return photos;
};

export const OFFERS = [
  {name: `Add luggage`, type: `luggage`, cost: 10},
  {name: `Switch to comfort class`, type: `comfort`, cost: 150},
  {name: `Add meal`, type: `meal`, cost: 2},
  {name: `Choose seats`, type: `seats`, cost: 9},
];

const generateAddOptions = () => {
  return getRandomArrayElements(OFFERS, 2);
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const getRandomNextDate = (date) => {
  date.setDate(date.getDate() + getRandomNumber(0, 2));
  date.setHours(date.getHours() + getRandomNumber(0, 24));
  date.setMinutes(date.getMinutes() + getRandomNumber(0, 60));
  return date;
};

export const generateEvent = () => {
  const randomDate = getRandomDate();

  return {
    // type: generateType(),
    type: getRandomArrayElement(TYPES),
    city: getRandomArrayElement(CITIES),
    photos: generatePhotosArray(),
    description: generateDescription(),
    price: getRandomNumber(PRICE_MIN, PRICE_MAX),
    startTime: new Date(randomDate),
    endTime: new Date(getRandomNextDate(randomDate)),
    options: generateAddOptions()
  };
};

export const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export const events = generateEvents(EVENTS_COUNT);

