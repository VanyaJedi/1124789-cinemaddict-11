
import AbstractComponent from "./abstractComponent.js";

export default class ShowMoreBtn extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
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
