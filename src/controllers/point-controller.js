import CardComponent from "../components/create-card";
import {render, RENDER_POSITION} from "../utils/render";
import EditEventComponent from "../components/edit-event";
import {replace} from "../utils/render";
import {events} from "../mocks/event";

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
  }

  render(event) {

    const card = new CardComponent(event);
    const editCard = new EditEventComponent(event);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replaceEditToCard();
      }
    };
    const replaceEditToCard = () => {
      replace(card, editCard);
    };
    const replaceCardToEdit = () => {
      replace(editCard, card);
      document.addEventListener(`keydown`, onEscKeyDown, {once: true});
    };
    card.setRollupButtonClickHandler(replaceCardToEdit);
    editCard.setRollupButtonClickHandler(replaceEditToCard);
    editCard.setSubmitFormHandler(replaceEditToCard);

    editCard.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite
      }))
      // console.log(events[0])
    });
    render(this._container, card.getElement(), RENDER_POSITION.BEFOREEND);
  };

};
