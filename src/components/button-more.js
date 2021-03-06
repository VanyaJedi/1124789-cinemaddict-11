
import AbstractComponent from "./abstract-component.js";

export default class ButtonMore extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button> `;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
