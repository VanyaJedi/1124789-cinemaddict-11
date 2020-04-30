import AbstractComponent from "./abstractComponent.js";

const createMenuTemplate = (films, activeFilter) => {
  const watchList = films.filter((it) => it.addToWatchlist);
  const watchedList = films.filter((it) => it.watched);
  const favouriteList = films.filter((it) => it.favourites);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a data-filtertype="all" href="#all" class="main-navigation__item ${activeFilter === `all` ? `main-navigation__item--active` : ``}">All movies</a>
        <a data-filtertype="toWatch" href="#watchlist" class="main-navigation__item ${activeFilter === `toWatch` ? `main-navigation__item--active` : ``}">Watchlist <span class="main-navigation__item-count">${watchList.length}</span></a>
        <a data-filtertype="watched" href="#history" class="main-navigation__item ${activeFilter === `watched` ? `main-navigation__item--active` : ``}">History <span class="main-navigation__item-count">${watchedList.length}</span></a>
        <a data-filtertype="favorites" href="#favorites" class="main-navigation__item ${activeFilter === `favorites` ? `main-navigation__item--active` : ``}">Favorites <span class="main-navigation__item-count">${favouriteList.length}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(film, activeFilter) {
    super();
    this._activeFilter = activeFilter;
    this._film = film;
  }

  getTemplate() {
    return createMenuTemplate(this._film, this._activeFilter);
  }

  setFilterChangeHandler(handler) {
    const filterBlock = this.getElement().querySelector(`.main-navigation__items`);
    filterBlock.addEventListener(`click`, (evt)=> {
      const filterType = evt.target.dataset.filtertype;
      const isChange = (filterType === this._activeFilter);
      if (filterType && !isChange) {
        Array.from(filterBlock.querySelectorAll(`a`)).forEach((a) => a.classList.remove(`main-navigation__item--active`));
        evt.target.classList.add(`main-navigation__item--active`);
        this._activeFilter = filterType;
        handler(evt.target.dataset.filtertype);
      }
    });
  }
}
