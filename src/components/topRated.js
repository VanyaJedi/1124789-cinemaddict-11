
import FilmCard from "./filmCard.js";
import {createElement} from "../util.js";

const topRatedTemplate = (films) => {

  const topRatedArray = films.slice()
                                .sort((a, b) => (b.rate - a.rate))
                                .slice(0, 2);

  const topRated = topRatedArray.map((it) => {
    return new FilmCard(it).getTemplate();
  }).join(`\n`);

  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container">
          ${topRated}
        </div>
      </section>
    `
  );
};

export default class TopRated {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return topRatedTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
