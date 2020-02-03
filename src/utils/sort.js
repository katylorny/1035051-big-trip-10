import {SortType} from "../components/sort";

export const getSortedPoints = (points, sortType) => {
  let sortedPoints = [];

  switch (sortType) {
    case SortType.EVENT:
      sortedPoints = points.slice().sort((a, b) => a.startTime - b.startTime);
      break;
    case SortType.PRICE:
      sortedPoints = points.slice().sort((a, b) => b.price - a.price);
      break;
    case SortType.TIME:
      sortedPoints = points.slice().sort((a, b) => {
        return (b.endTime - b.startTime) - (a.endTime - a.startTime);
      });
      break;
  }

  return sortedPoints;
};
