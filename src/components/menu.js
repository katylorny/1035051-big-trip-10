import {generateMenuItems} from "../mocks/menu";
import {createElement} from "../util";
// import {createFilterTemplate} from "./filter";
// import {generateFilters} from "../mocks/filter";

const generateMenuMarkup = generateMenuItems().map((el) => {
  let {title, isChecked} = el;
  return (
    `<a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`
  );
}).join(`\n`);

const createMenuTemplate = () => { // Меню
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${generateMenuMarkup}
     </nav>`
  );
};

export default class Menu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate();
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
