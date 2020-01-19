import {SORT_TYPES} from "../components/sort";

export const getSortedPoints = (points, sortType) => {
  let sortedPoints = [];

  switch (sortType) {
    case SORT_TYPES.EVENT:
      sortedPoints = points.slice().sort((a, b) => a.startTime - b.startTime);
      break;
    case SORT_TYPES.PRICE:
      sortedPoints = points.slice().sort((a, b) => b.price - a.price);
      break;
    case SORT_TYPES.TIME:
      sortedPoints = points.slice().sort((a, b) => {
        return (b.endTime - b.startTime) - (a.endTime - a.startTime);
      });
      break;
  }

  return sortedPoints;
};
