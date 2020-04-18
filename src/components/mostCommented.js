
import FilmCard from "./filmCard.js";
import AbstractComponent from "./abstractComponent.js";

const mostCommentedTemplate = (films) => {

  const mostCommentedArray = films.slice()
                                .sort((a, b) => (b.comments.length - a.comments.length))
                                .slice(0, 2);

  const mostCommented = mostCommentedArray.map((it) => {
    const filmCard = new FilmCard(it);
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


export default class MostCommented extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return mostCommentedTemplate(this._films);
  }

}
