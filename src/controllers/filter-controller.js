import FilterComponent from "../components/filter";
import {FILTERS} from "../constants";
import {render, replace} from "../utils/render";

export default class FilterController {
  constructor(container, model) {
    this._container = container;
    this._model = model;

    this._activeFilterType = FILTERS.EVERYTHING;
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._model.getFunctionFromFilterController(this._onDataChange);

    this._filterComponent = null;

  }

  render() {
    const container = this._container;
    const filters = Object.values(FILTERS).map((filterType) => {
      return {
        title: filterType,
        isChecked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (!oldComponent) {
      render(container, this._filterComponent.getElement());
    } else {
      replace(this._filterComponent, oldComponent);
    }
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._model.setFilterType(filterType);
    this.render();

    this._model._filterHandlers.forEach((handler) => handler()); // TODO
  }

  _onDataChange() {
    this.render();
  }
}
