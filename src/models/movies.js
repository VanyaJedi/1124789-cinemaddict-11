
import {FilterType, getTasksByFilter} from '../util/filter.js';

export default class Movies {

  constructor() {
    this._movies = [];

    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getAllMovies() {
    return this._movies;
  }

  getMovies() {
    return getTasksByFilter(this._movies, this._activeFilterType);
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  addDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _executeAllHandlers(handlers) {
    handlers.forEach((handler) => {
      handler();
    });
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.item === id);
    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._executeAllHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._executeAllHandlers(this._filterChangeHandlers);
  }
}
