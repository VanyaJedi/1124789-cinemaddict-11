export const topRatedTemplate = () => {
  return (
    ` <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>

        <div class="films-list__container">
          <article class="film-card">
            <h3 class="film-card__title">The Man with the Golden Arm</h3>
            <p class="film-card__rating">9.0</p>
            <p class="film-card__info">
              <span class="film-card__year">1955</span>
              <span class="film-card__duration">1h 59m</span>
              <span class="film-card__genre">Drama</span>
            </p>
            <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
            <p class="film-card__description">Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…</p>
            <a class="film-card__comments">18 comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
            </form>
          </article>

          <article class="film-card">
            <h3 class="film-card__title">The Great Flamarion</h3>
            <p class="film-card__rating">8.9</p>
            <p class="film-card__info">
              <span class="film-card__year">1945</span>
              <span class="film-card__duration">1h 18m</span>
              <span class="film-card__genre">Mystery</span>
            </p>
            <img src="./images/posters/the-great-flamarion.jpg" alt="" class="film-card__poster">
            <p class="film-card__description">The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…</p>
            <a class="film-card__comments">12 comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
            </form>
          </article>
        </div>
      </section>
    `
  );
};
