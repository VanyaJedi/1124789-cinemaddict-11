import AbstractComponent from "./abstractComponent.js";

export default class Content extends AbstractComponent {

  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return (
      `<section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

          <div class="films-list__container">
          </div>
        </section>
        </section>
      </section>`
    );
  }
}
