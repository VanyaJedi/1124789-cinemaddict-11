import AbstractComponent from "./abstractComponent.js";

export default class NoFilm extends AbstractComponent {

  constructor() {
    super();
  }

  getTemplate() {
    return (
      `<section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>`
    );
  }
}
