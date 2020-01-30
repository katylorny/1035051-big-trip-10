export default class PointModel {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.city = data[`destination`][`name`];
    this.description = data[`destination`][`description`];
    this.photos = data[`destination`][`pictures`];

    this.price = data[`base_price`];
    this.startTime = new Date(data[`date_from`]);
    this.endTime = new Date(data[`date_to`]);
    this.options = data[`offers`];
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      "base_price": this.price,
      "date_from": this.startTime.toISOString(),
      "date_to": this.endTime.toISOString(),
      "destination": {
        'name': this.city,
        'description': this.description,
        'pictures': this.photos,
      },
      "id": this.id,
      "is_favorite": this.isFavorite,
      "offers": this.options,
      "type": this.type,
    };
  }

  static parsePoint(data) {
    return new PointModel(data);
  }

  static parsePoints(data) {
    return data.map(PointModel.parsePoint);
  }

  static clone(data) {
    return new PointModel(data.toRAW());
  }
}
