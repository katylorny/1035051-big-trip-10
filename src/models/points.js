import {FILTERS} from "../constants";
import {getPointsByFilter} from "../utils/filter";

export default class PointsModel {
  constructor() {
    this._points = [];
    this._activeFilterType = FILTERS.EVERYTHING;

    this._filterHandlers = [];
  }

  setPoints(points) {
    this._points = Array.from(points);
  }

  getPoints() {
    return this._points;
  }

  getFilteredPoints() {
    return getPointsByFilter(this._points, this._activeFilterType); //
  }

  updatePointsData(oldPointId, newPoint) {
    const index = this._points.findIndex((it) => it.id === oldPointId);
    if (index === -1) {
      return;
    }
    this._points = [].concat(this._points.slice(0, index), newPoint, this._points.slice(index + 1));
  }

  getFunctionFromTripController(handler) {
    this._filterHandlers.push(handler);
  }
}
