export default class StorageModel {
  constructor() {
    this._destinations = null;
    this._offersTypes = null;
  }


  static getCities() {
    return this._destinations.map((destination) => destination.name);
  }

  static getDestination(city) {
    return this._destinations.find((destination) => destination.name === city);
  }

  static getOffersOfType(type) {
    return this._offersTypes.find((offerType) => offerType.type === type).offers;
  }

  static setDestinations(destinations) {
    StorageModel._destinations = destinations;
  }

  static setOffersTypes(offersTypes) {
    StorageModel._offersTypes = offersTypes;
  }
}
