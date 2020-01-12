import CardComponent from "../components/create-card";
import {render, RENDER_POSITION} from "../utils/render";
import EditEventComponent from "../components/edit-event";
import {replace, remove} from "../utils/render";


const MODES = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = MODES.DEFAULT;
  }

  render(event) {

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new CardComponent(event);
    this._eventEditComponent = new EditEventComponent(event);
    this._eventEditComponent.recoveryListeners();

    this._eventComponent.setRollupButtonClickHandler(() => this._replaceCardToEdit());
    this._eventEditComponent.setRollupButtonClickHandler(() => this._replaceEditToCard());
    this._eventEditComponent.setSubmitFormHandler(() => this._replaceEditToCard());

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite
      }));
    });

    if (oldEventComponent && oldEventEditComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      render(this._container, this._eventComponent.getElement(), RENDER_POSITION.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode === MODES.EDIT) {
      this._replaceEditToCard();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown); // TODO: мб можно без этого
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToCard();
    }
  }

  _replaceEditToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = MODES.DEFAULT;
  }

  _replaceCardToEdit() {

    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, (evt) => this._onEscKeyDown(evt), {once: true});
    this._mode = MODES.EDIT;
  }
}
