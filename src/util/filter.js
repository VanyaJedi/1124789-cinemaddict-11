
import moment from "moment";

export const filterTypes = {
  ALL: `all`,
  TO_WATCH: `toWatch`,
  WATCHED: `watched`,
  FAVORITES: `favorites`
};

export const filterChartTypes = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
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

export const getMoviesForChart = (movies, filterType) => {

  switch (filterType) {
    case filterChartTypes.ALL:
      return movies;
    case filterChartTypes.TODAY:
      return movies.filter((movie) => {
        return moment().diff(movie.watchingDate, `days`) === 0;
      });
    case filterChartTypes.WEEK:
      return movies.filter((movie) => {
        return moment().diff(movie.watchingDate, `days`) <= 7;
      });
    case filterChartTypes.MONTH:
      return movies.filter((movie) => {
        return moment().diff(movie.watchingDate, `days`) <= 31;
      });
    case filterChartTypes.YEAR:
      return movies.filter((movie) => {
        return moment().diff(movie.watchingDate, `days`) <= 364;
      });

  }
  return movies;
};
