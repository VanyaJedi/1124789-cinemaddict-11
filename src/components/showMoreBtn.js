
import AbstractComponent from "./abstractComponent.js";

export default class ShowMoreBtn extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button> `;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
