
import AbstractComponent from "./abstractComponent.js";
export default class Statistics extends AbstractComponent {
  constructor(films) {
    super();
    this._movieModel = films;
    this._films = films.getAllMovies();
  }

  getTemplate() {
    return (
      `<section class="footer__statistics">
          <p>${this._films.length} movies inside</p>
        </section>
      `
    );
  }
}
