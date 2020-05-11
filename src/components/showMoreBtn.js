
import AbstractComponent from "./abstractComponent.js";

export default class ShowMoreBtn extends AbstractComponent {
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
