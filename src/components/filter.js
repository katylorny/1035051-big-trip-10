import AbstractComponent from "./abstract-component";

const generateFilterMarkup = (filters) => {
  return (
    filters.map((el) => {
      const {title, isChecked} = el;
      return (
        `<div class="trip-filters__filter">
       <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${isChecked ? `checked` : ``}>
       <label class="trip-filters__filter-label" for="filter-everything">${title}</label>
     </div>`
      );
    }).join(`\n`)
  );
};

const createFilterTemplate = (filters) => { // Фильтры

  const filterMarkup = generateFilterMarkup(filters);

  return (
    `<form class="trip-filters" action="#" method="get">
              ${filterMarkup}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`
  );
};

export default class Filter extends AbstractComponent {

  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => handler(evt.target.textContent));
  }
}
