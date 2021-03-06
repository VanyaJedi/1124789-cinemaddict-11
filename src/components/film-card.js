import AbstractComponent from "./abstract-component.js";

const DESC_LEN = 140;

export default class FilmCard extends AbstractComponent {

  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    const {item, poster, name, rate, releaseDate, duration, genres, desc, comments, addToWatchlist, watched, favourites} = this._film;
    return (
      `<article class="film-card" data-address=${item}>
        <h3 class="film-card__title">${name}</h3>
        <p class="film-card__rating">${rate}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDate.year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${desc.length > DESC_LEN ? `${desc.substr(0, DESC_LEN - 1)}...` : desc}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addToWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${favourites ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
        </form>
      </article>`
    );
  }

  setShowPopupHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setAddToWatchBtnClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setMarkAsWatchedBtnClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setAddToFavoriteBtnClick(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}

