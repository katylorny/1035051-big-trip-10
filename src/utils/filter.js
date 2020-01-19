import {FILTERS} from "../constants";


export const getFuturePoints = (points) => {
  return points.filter((point) => {
    const nowDate = new Date();
    return nowDate < point.startTime;
  });
};

export const getPastPoints = (points) => {
  return points.filter((point) => {
    const nowDate = new Date();
    return nowDate > point.endTime;
  });
};

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FILTERS.EVERYTHING:
      return points;
    case FILTERS.FUTURE:
      return getFuturePoints(points);
    case FILTERS.PAST:
      return getPastPoints(points);
  }
  return points;
};
