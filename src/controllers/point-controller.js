import CardComponent from "../components/create-card";
import {render, RENDER_POSITION} from "../utils/render";
import EditEventComponent from "../components/edit-event";
import {replace, remove} from "../utils/render";
// import {typesWithOffers} from "../mocks/event";
import {TRIP_MODE} from "./trip-controller";
import {reformatDate} from "../utils/common";
import PointModel from "../models/point-model";

const EmptyPoint = {
  'type': `transport`,
  'destination': {
    'name': ``,
    'description': ``,
    'pictures': [],
  },
  "base_price": ``,
  "date_from": new Date(),
  "date_to": new Date(),
  "offers": [],
  "is_favorite": false,
};

export const EmptyPointModel = new PointModel(EmptyPoint);

export const MODES = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};


const parseFormData = ({formData, offers, description, photos, id}) => {

  return new PointModel({
    'type': formData.get(`event-type`),
    'destination': {
      'name': formData.get(`event-destination`),
      'description': description,
      'pictures': photos,
    },
    "base_price": parseInt(formData.get(`event-price`), 10),
    "date_from": reformatDate(formData.get(`event-start-time`)),
    "date_to": reformatDate(formData.get(`event-end-time`)),
    "offers": offers,
    "is_favorite": formData.has(`event-favorite`),
    'id': id,
  });
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, api, tripMode = TRIP_MODE.DEFAULT) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._tripMode = tripMode;
    this._api = api;

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
      const newData = parseFormData(this._eventEditComponent.getData());

      this._onDataChange(this, event, newData);

      if (this._mode !== MODES.ADDING) {
        this._replaceEditToCard();
      }
      document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
    });

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {

      const newEvent = PointModel.clone(event);
      newEvent.isFavorite = !event.isFavorite;
      this._api.updatePoint(event.id, newEvent);

    });

    this._eventEditComponent.setDeleteButtonHandler(() => {
      this._onDataChange(this, event, null);
      document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
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
