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

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    // this._cityChangeHandler = this._cityChangeHandler.bind(this);
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = MODES.DEFAULT;

  }

  render(event) {

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new CardComponent(event);
    this._eventEditComponent = new EditEventComponent(event);


    this._eventComponent.setRollupButtonClickHandler(() => {
        this._replaceCardToEdit();
        document.addEventListener(`keydown`, this._onEscKeyDown);
      }
    );

    this._eventEditComponent.setRollupButtonClickHandler(() => {
      this._replaceEditToCard();
    });

    this._eventEditComponent.setSubmitFormHandler(() => {
      this._onDataChange(this, event, this._eventEditComponent.getData());

      this._replaceEditToCard();
    });

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite
      }));
    });

    this._eventEditComponent.setDeleteButtonHandler(() => {
      this._onDataChange(this, event, null);
    });

    if (oldEventComponent && oldEventEditComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      render(this._container, this._eventComponent.getElement(), RENDER_POSITION.BEFOREEND);
    }
    // this._eventEditComponent.recoveryListeners();
  }

  setDefaultView() {
    if (this._mode === MODES.EDIT) {
      this._replaceEditToCard();
    }
  }

  destroyPoint() {
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
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();
    this._eventEditComponent.rerender();
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = MODES.DEFAULT;
  }

  _replaceCardToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = MODES.EDIT;
  }
}
