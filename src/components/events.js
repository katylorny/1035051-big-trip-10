import AbstractComponent from './abstract-component';

const createTemplate = () => {
  return (
    `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>`
  );
};

export default class Events extends AbstractComponent {
  getTemplate() {
    return createTemplate();
  }

  hide() {
    this.getElement().classList.add(`trip-events--hidden`);
  }

  show() {
    this.getElement().classList.remove(`trip-events--hidden`);
  }
}
