import {FILTERS} from "../constants";
import {getPointsByFilter} from "../utils/filter";

export default class PointsModel {
  constructor() {
    this._points = [];
    this._activeFilterType = FILTERS.EVERYTHING;

    this._filterHandlers = [];
    this._dataChangeHandlers = [];
  }

  setPoints(points) {
    this._points = Array.from(points);
  }

  getFilteredPoints() {
    return getPointsByFilter(this._points, this._activeFilterType); //
  }

  getAllPoints() {
    return this._points;
  }


  setFilterType(filterType) {
    this._activeFilterType = filterType;

    this._filterHandlers.forEach((handler) => handler());
  }

  addPoint(point) {
    this._points = [].concat(point, this._points);
    this._dataChangeHandlers.forEach((handler) => handler());
  }


  removePoint(pointId) {
    const index = this._points.findIndex((it) => it.id === pointId);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));
    this._dataChangeHandlers.forEach((handler) => handler());
    return true;
  }

  updatePointsData(oldPointId, newPoint) {
    const index = this._points.findIndex((it) => it.id === oldPointId);
    if (index === -1) {
      return false;
    }
    this._points = [].concat(this._points.slice(0, index), newPoint, this._points.slice(index + 1));
    this._dataChangeHandlers.forEach((handler) => handler());
    return true;
  }

  getFunctionFromTripController(handler) {
    this._filterHandlers.push(handler);
  }

  getFunctionFromFilterController(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
