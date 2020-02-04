import {Filter} from "../constants";


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
    case Filter.EVERYTHING:
      return points;
    case Filter.FUTURE:
      return getFuturePoints(points);
    case Filter.PAST:
      return getPastPoints(points);
  }
  return points;
};
