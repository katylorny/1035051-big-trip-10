import AbstractComponent from "./abstract-component";

const generateFilterMarkup = (filters) => {
  return (
    filters.map((element) => {
      const {title, isChecked, isEmpty} = element;
      return (
        `<div class="trip-filters__filter">
       <input 
          id="filter-${title.toLowerCase()}" 
          class="trip-filters__filter-input  visually-hidden" 
          type="radio" 
          name="trip-filter" 
          value="${title.toLowerCase()}" 
          ${isChecked ? `checked` : ``}
          ${isEmpty ? `disabled` : ``}
            >
           <label class="trip-filters__filter-label ${isEmpty ? `disabled-filter` : ``}" for="filter-${title.toLowerCase()}" >${title}</label>
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
    this.getElement().addEventListener(`change`, (evt) => {
      console.log(9999, evt.target.value);
      const filterName = evt.target.value;
      handler(filterName);
    });
  }
}
