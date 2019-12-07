import {createElement} from "../util";

export const createCardsTemplate = () => { // <ul class="trip-days"> trip-events__list
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

// import {DESCRIPTION_ARRAY} from "../mocks/event";

export default class Cards {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCardsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
