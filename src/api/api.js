import PointModel from "../models/point-model";
import StorageModel from "../models/storage-model";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;

    this.updatePoint = this.updatePoint.bind(this);
  }

  getPoints() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then(PointModel.parsePoints);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then((response) => response.json())
      .then((destinations) => {
        StorageModel.setDestinations(destinations);
        return destinations;
      });
  }

  getOffersTypes() {
    return this._load({url: `offers`})
      .then((response) => response.json())
      .then((offersTypes) => {
        StorageModel.setOffersTypes(offersTypes);
        return offersTypes;
      });
  }

  updatePoint(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(PointModel.parsePoint);
  }


  createPoint(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(point.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(PointModel.parsePoint);
  }

  deletePoint(id) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE,
    });
  }

  sync(data) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

}
