import nanoid from "nanoid";
import PointModel from "../models/point-model";
import StorageModel from "../models/storage-model";

const getSyncedPoints = (items) => items.filter(({success}) => success).map(({payload}) => payload.point);


export default class Provider {
  constructor(api, store, destinationsStore, typesOffersStore) {
    this._api = api;
    this._store = store;
    this._destinationsStore = destinationsStore;
    this._typesOffersStore = typesOffersStore;
    this._isSynchronized = true;
  }

  getPoints() {
    if (this._isOnLine()) {
      return this._api.getPoints()
        .then(
            (points) => {
              points.forEach((point) => this._store.setItem(point.id, point.toRAW()));
              return points;
            }
        );
    }

    const storePoints = Object.values(this._store.getAll());

    this._isSynchronized = false;
    return Promise.resolve(PointModel.parsePoints(storePoints));
  }

  createPoint(point) {
    if (this._isOnLine()) {
      return this._api.createPoint(point)
        .then(
            (newPoint) => {
              this._store.setItem(newPoint.id, newPoint.toRAW());
              return newPoint;
            }
        );
    }

    const fakeNewPointId = nanoid();
    const fakeNewPoint = PointModel.parsePoint(Object.assign({}, point.toRAW(), {id: fakeNewPointId}));
    this._isSynchronized = false;
    this._store.setItem(fakeNewPoint.id, Object.assign({}, fakeNewPoint.toRAW(), {offline: true}));

    return Promise.resolve(fakeNewPoint);
  }

  updatePoint(id, point) {
    if (this._isOnLine()) {
      return this._api.updatePoint(id, point)
        .then(
            (newTask) => {
              this._store.setItem(newTask.id, newTask.toRAW());
              return newTask;
            }
        );
    }

    const fakeUpdatedPoint = PointModel.parsePoint(Object.assign({}, point.toRAW(), {id}));
    this._isSynchronized = false;
    this._store.setItem(id, Object.assign({}, fakeUpdatedPoint.toRAW(), {offline: true}));

    return Promise.resolve(fakeUpdatedPoint);
  }

  deletePoint(id) {
    if (this._isOnLine()) {
      return this._api.deletePoint(id)
        .then(
            () => {
              this._store.removeItem(id);
            }
        );
    }
    this._isSynchronized = false;
    this._store.removeItem(id);

    return Promise.resolve();
  }


  getDestinations() {
    if (this._isOnLine()) {
      return this._api.getDestinations().then((destinations) => {
        destinations.forEach((destination, index) => this._destinationsStore.setItem(index, destination));

        return destinations;
      });
    }

    const storeDestinations = Object.values(this._destinationsStore.getAll());

    return Promise.resolve(StorageModel.setDestinations(storeDestinations));
  }

  getOffersTypes() {
    if (this._isOnLine()) {
      return this._api.getOffersTypes().then((offersTypes) => {
        offersTypes.forEach((typesOffers, index) => this._typesOffersStore.setItem(index, typesOffers));

        return offersTypes;
      });
    }

    const storeTypesOffers = Object.values(this._typesOffersStore.getAll());

    return Promise.resolve(StorageModel.setOffersTypes(storeTypesOffers));
  }


  sync() {
    if (this._isOnLine()) {
      const storePoints = Object.values(this._store.getAll());

      return this._api.sync(storePoints)
        .then((response) => {
          storePoints.filter((point) => point.offline).forEach((task) => { // ОШИБКА
            this._store.removeItem(task.id);
          });

          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          [...createdPoints, ...updatedPoints].forEach((task) => {
            this._store.setItem(task.id, task);
          });

          this._isSynchronized = true;

          return Promise.resolve();
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  getSynchronize() {
    return this._isSynchronized;
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
