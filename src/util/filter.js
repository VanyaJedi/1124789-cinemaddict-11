

export const filterTypes = {
  ALL: `all`,
  TO_WATCH: `toWatch`,
  WATCHED: `watched`,
  FAVORITES: `favorites`
};


export const getTasksByFilter = (movies, filterType) => {

  switch (filterType) {
    case filterTypes.ALL:
      return movies;
    case filterTypes.TO_WATCH:
      return movies.filter((movie) => movie.addToWatchlist);
    case filterTypes.WATCHED:
      return movies.filter((movie) => movie.watched);
    case filterTypes.FAVORITES:
      return movies.filter((movie) => movie.favourites);

  }
  return movies;
};

