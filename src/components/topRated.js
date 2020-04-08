
import {createFilmCardTemplate} from "./filmCard.js";

export const topRatedTemplate = (films) => {

  const topRatedArray = films.slice()
                                .sort((a, b) => (b.rate - a.rate))
                                .slice(0, 2);

  const topRated = topRatedArray.map((it) => {
    return createFilmCardTemplate(it);
  }).join(`\n`);

  return (
    ` <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container">
          ${topRated}
        </div>
      </section>
    `
  );
};
