import AbstractComponent from './abstract-component';

const createTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

export default class NewPointButton extends AbstractComponent {
  constructor() {
    super();
    this.setDisabled = this.setDisabled.bind(this);
  }

  getTemplate() {
    return createTemplate();
  }

  setNewPointButtonClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setDisabled(isDisabled) {
    if (isDisabled) {
      this.getElement().setAttribute(`disabled`, `disabled`);
    } else {
      this.getElement().removeAttribute(`disabled`);
    }
  }
}
