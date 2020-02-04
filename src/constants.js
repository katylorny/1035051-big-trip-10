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


export const makeFirstLetterUpper = (word) => {
  return word
    .toLowerCase()
    .split(` `)
    .map((it) => it[0].toUpperCase() + it.substr(1))
    .join(` `);
};
