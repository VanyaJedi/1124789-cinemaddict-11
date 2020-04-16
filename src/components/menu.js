import {createElement} from "../util.js";

const createMenuTemplate = (films) => {
  const watchList = films.filter((it) => it.addToWatchlist);
  const watchedList = films.filter((it) => it.watched);
  const favouriteList = films.filter((it) => it.favourites);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchList.length}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedList.length}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favouriteList.length}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._film);
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
