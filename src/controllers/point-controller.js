import CardComponent from "../components/create-card";
import {render, RENDER_POSITION} from "../utils/render";
import EditEventComponent from "../components/edit-event";
import {replace} from "../utils/render";

export default class PointController {
  constructor(container) {
    this._container = container;
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

    render(this._container, card.getElement(), RENDER_POSITION.BEFOREEND);
  };

};
