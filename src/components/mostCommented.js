
import {createFilmCardTemplate} from "./filmCard.js";

export const mostCommentedTemplate = (films) => {

  const mostCommentedArray = films.slice()
                                .sort((a, b) => (b.comments.length - a.comments.length))
                                .slice(0, 2);

  const mostCommented = mostCommentedArray.map((it) => {
    return createFilmCardTemplate(it);
  }).join(`\n`);

  return (
    ` <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container">
          ${mostCommented}
        </div>
      </section>
    `
  );
};
