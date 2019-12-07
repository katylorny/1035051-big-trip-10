import {generateFilters} from "../mocks/filter";
import {createElement} from "../util";

// const generateFilterMarkup = () => {
//
// };

const generateFilterMarkup = generateFilters().map((el) => {
  let {title, isChecked} = el;
  return (
    `<div class="trip-filters__filter">
       <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${isChecked ? `checked` : ``}>
       <label class="trip-filters__filter-label" for="filter-everything">${title}</label>
     </div>`
  );
}).join(`\n`);

const createFilterTemplate = () => { // Фильтры
  return (
    `<form class="trip-filters" action="#" method="get">
              ${generateFilterMarkup}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`
  );
};

export default class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate();
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
