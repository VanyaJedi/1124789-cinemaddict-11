
import AbstractSmartComponent from "./abstractSmartComponent.js";
import moment from "moment";

const createGenresList = (genres) => {
  return genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span> `;
  }).join(`\n`);
};

const createCommentList = (comments) => {
  return comments.map((comment) => {
    return (
      `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.smile}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.message}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.user}</span>
            <span class="film-details__comment-day">${moment(comment.date).locale(`ru`).format(`YYYY/MM/DD HH:SS`)}</span>
            <button data-address=${comment.item} class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>

      `
    );
  }).join(`\n`);
};

const createFilmPopupTemplate = (film) => {

  const commentsList = createCommentList(film.comments);
  const genresList = createGenresList(film.genres);
  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${film.poster}" alt="">

            <p class="film-details__age">${film.ageRate}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${film.name}</h3>
                <p class="film-details__title-original">${film.originalName}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${film.rate}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${film.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${film.authors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${film.actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${film.releaseDate.day + film.releaseDate.month + film.releaseDate.year}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${film.duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${film.country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${film.genres.length > 1 ? `Genres` : `Genre`}</td>
                <td class="film-details__cell">
                  ${genresList}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${film.desc}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${film.addToWatchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${film.watched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${film.favourites ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsList}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>
    `
  );
};

export default class FilmPopup extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._closePopupHandler = null;
    this._addToWatchHandler = null;
    this._addWatchedHandler = null;
    this._addToFavoriteHandler = null;
    this._addEmojiClickHandler = null;
    this._addDeleteCommentHandler = null;
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film);
  }

  recoveryListeners() {
    this._subscribeEventListeners();
  }

  closePopup() {
    if (document.querySelector(`.film-details`)) {
      document.querySelector(`.film-details`).remove();
      document.body.classList.remove(`hide-overflow`);
    }
  }

  setCloseBtnHandler(handler) {
    this._closePopupHandler = handler;
    const closeBtn = this.getElement().querySelector(`.film-details__close-btn`);
    closeBtn.addEventListener(`click`, handler);
  }

  setAddToWatchBtnClick(handler) {
    this._addToWatchHandler = handler;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);
  }

  setMarkAsWatchedBtnClick(handler) {
    this._addWatchedHandler = handler;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);
  }

  setAddToFavoriteBtnClick(handler) {
    this._addToFavoriteHandler = handler;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);
  }

  setEmojiClickHandler(handler) {
    this._addEmojiClickHandler = handler;
    const emojis = this.getElement().querySelectorAll(`.film-details__emoji-item`);

    Array.from(emojis).forEach((emoji) => {
      emoji.addEventListener(`click`, handler);
    });
  }

  setDeleteCommentHandler(handler) {
    this._addDeleteCommentHandler = handler;
    const comments = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    Array.from(comments).forEach((deleteBtn) => {
      deleteBtn.addEventListener(`click`, handler);
    });
  }

  _subscribeEventListeners() {
    this.setCloseBtnHandler(this._closePopupHandler);
    this.setAddToWatchBtnClick(this._addToWatchHandler);
    this.setMarkAsWatchedBtnClick(this._addWatchedHandler);
    this.setAddToFavoriteBtnClick(this._addToFavoriteHandler);
    this.setEmojiClickHandler(this._addEmojiClickHandler);
    this.setDeleteCommentHandler(this._addDeleteCommentHandler);
  }

}

