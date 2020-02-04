import FilterComponent from "../components/filter";
import {Filter, makeFirstLetterUpper} from "../constants";
import {render, replace} from "../utils/render";
import {getPointsByFilter} from "../utils/filter";

export default class FilterController {
  constructor(container, model) {
    this._container = container;
    this._model = model;

    this._activeFilterType = Filter.EVERYTHING;
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._model.getFunctionFromFilterController(this._onDataChange);

    this._filterComponent = null;

  }

  render() {
    const container = this._container;
    const filters = Object.values(Filter).map((filterType) => {
      return {
        title: filterType,
        isChecked: filterType === this._activeFilterType,
        isEmpty: getPointsByFilter(this._model.getAllPoints(), filterType).length === 0,
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
    this._activeFilterType = makeFirstLetterUpper(filterType);
    this._model.setFilterType(this._activeFilterType);
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
