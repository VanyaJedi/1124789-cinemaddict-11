import AbstractComponent from "./abstractComponent.js";

export default class NoFilm extends AbstractComponent {

  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return (
      `<section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>`
    );
  }
}
