import CardComponent from "../components/create-card";
import {render, RENDER_POSITION} from "../utils/render";
import EditEventComponent from "../components/edit-event";
import {replace, remove} from "../utils/render";
import {typesWithOffers} from "../mocks/event";
import {TRIP_MODE} from "./trip-controller";

export const EmptyPoint = {
  id: String(new Date() + Math.random()),
  type: typesWithOffers[0].type,
  city: ``,
  photos: [],
  description: ``,
  price: ``,
  startTime: new Date(),
  endTime: new Date(),
  options: typesWithOffers[0].offers,
  isFavorite: false,
};

export const MODES = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, tripMode = TRIP_MODE.DEFAULT) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._tripMode = tripMode;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = MODES.DEFAULT;
    // this._tripMode = tripMode; - передавалось чтобы отделить режим создания первого поинта
  }

  render(event, mode) {
    this._mode = mode;
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new CardComponent(event);
    this._eventEditComponent = new EditEventComponent(event, mode);


    this._eventComponent.setRollupButtonClickHandler(() => {
      this._replaceCardToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });


    this._eventEditComponent.setRollupButtonClickHandler(() => {
      this._replaceEditToCard();
    });

    this._eventEditComponent.setSubmitFormHandler(() => {
      this._onDataChange(this, event, this._eventEditComponent.getData());

      if (this._mode !== MODES.ADDING) {
        this._replaceEditToCard();
      }

    });

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite
      }));
    });

    this._eventEditComponent.setDeleteButtonHandler(() => {
      this._onDataChange(this, event, null);
    });

    switch (this._mode) {
      case MODES.DEFAULT:
        if (oldEventComponent && oldEventEditComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
        } else {
          render(this._container, this._eventComponent.getElement(), RENDER_POSITION.BEFOREEND);
        }
        break;

      case MODES.ADDING:
        if (oldEventComponent && oldEventEditComponent) {
          remove(oldEventEditComponent);
          remove(oldEventComponent);
        }

        if (this._tripMode === TRIP_MODE.ADDING_FIRST_POINT) {
          render(this._container, this._eventEditComponent.getElement(), RENDER_POSITION.AFTERBEGIN);
        } else {
          render(this._container, this._eventEditComponent.getElement(), RENDER_POSITION.AFTEREND);
        }
        break;

    }
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
