
import moment from "moment";

export const FilterType = {
  ALL: `all`,
  TO_WATCH: `toWatch`,
  WATCHED: `watched`,
  FAVORITES: `favorites`
};

export const FilterChartType = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const FilterDaysCount = {
  TODAY: 0,
  WEEK: 7,
  MONTH: 31,
  YEAR: 364
};


export const getTasksByFilter = (movies, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return movies;
    case FilterType.TO_WATCH:
      return movies.filter((movie) => movie.addToWatchlist);
    case FilterType.WATCHED:
      return movies.filter((movie) => movie.watched);
    case FilterType.FAVORITES:
      return movies.filter((movie) => movie.favourites);

  }
  return movies;
};

export const getMoviesForChart = (movies, filterType) => {

  switch (filterType) {
    case FilterChartType.ALL:
      return movies;
    case FilterChartType.TODAY:
      return movies.filter((movie) => {
        return moment().diff(movie.watchingDate, `days`) === FilterDaysCount.TODAY;
      });
    case FilterChartType.WEEK:
      return movies.filter((movie) => {
        return moment().diff(movie.watchingDate, `days`) <= FilterDaysCount.WEEK;
      });
    case FilterChartType.MONTH:
      return movies.filter((movie) => {
        return moment().diff(movie.watchingDate, `days`) <= FilterDaysCount.MONTH;
      });
    case FilterChartType.YEAR:
      return movies.filter((movie) => {
        return moment().diff(movie.watchingDate, `days`) <= FilterDaysCount.YEAR;
      });

  }
  return movies;
};
