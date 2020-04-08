export const createMenuTemplate = (films) => {
  let watchlist = films.filter((it) => it.addToWatchlist);
  let watchedList = films.filter((it) => it.watched);
  let favlist = films.filter((it) => it.favourites);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist.length}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedList.length}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favlist.length}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
