
import FilmCard from "./filmCard.js";
import {createElement} from "../util.js";

const mostCommentedTemplate = (films) => {

  const mostCommentedArray = films.slice()
                                .sort((a, b) => (b.comments.length - a.comments.length))
                                .slice(0, 2);

  const mostCommented = mostCommentedArray.map((it) => {
    let filmCard = new FilmCard(it);
    return filmCard.getTemplate();
  }).join(`\n`);

  return (
    `<section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container">
          ${mostCommented}
        </div>
      </section>
    `
  );
};


export default class MostCommented {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return mostCommentedTemplate(this._films);
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
