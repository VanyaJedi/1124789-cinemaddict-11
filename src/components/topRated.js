
import FilmCard from "./filmCard.js";
import AbstractComponent from "./abstractComponent.js";

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

export default class TopRated extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return topRatedTemplate(this._films);
  }
}
