export const Filter = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`
};

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
};

export const TYPES_MOVE = [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`];
export const TYPES_STAY = [`check-in`, `restaurant`, `sightseeing`];


export const makeFirstLetterUpper = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(function(word) {
      console.log("First capital letter: "+word[0]);
      console.log("remain letters: "+ word.substr(1));
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
};
