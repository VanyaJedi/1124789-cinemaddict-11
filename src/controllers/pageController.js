import {render, remove} from "../util/manipulateDOM.js";
import {sortTypes} from "../util.js";
import ShowMoreBtn from "../components/showMoreBtn.js";
import TopRated from "../components/topRated.js";
import MostCommented from "../components/mostCommented.js";
import NoFilm from "../components/nofilm.js";
import Sort from "../components/sort.js";

import MovieController from "./movieController.js";
import MovieAdapter from "../models/moviesAdapter.js";

const FILM_COUNT_SHOW = 5;
const mainElem = document.querySelector(`.main`);

const getSortedFilms = (filmsArray, sortType, from, to) => {
  let showingFilms = filmsArray.slice();

  switch (sortType) {
    case sortTypes.BY_DATE:
      showingFilms.sort((a, b) => {
        if (b.releaseDate.date < a.releaseDate.date) {
          return -1;
        } else if (b.releaseDate.date > a.releaseDate.date) {
          return 1;
        }
        return 0;
      });
      break;
    case sortTypes.BY_RATE:
      showingFilms.sort((a, b) => b.rate - a.rate);
      break;
    case sortTypes.DEFAULT:
      showingFilms = filmsArray.slice();
      break;
  }

  return showingFilms.slice(from, to);
};

const renderFilms = (filmsList, films, onDataChange, onViewChange, api, onCommentsChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsList, onDataChange, onViewChange, api, onCommentsChange);
    movieController.render(film);
    return movieController;
  });
};

export default class PageController {
  constructor(container, movieModel, api) {

    this._moviesModel = movieModel;
    this._showedFilms = [];
    this._topRatedComponent = null;
    this._mostCommentedComponent = null;
    this._topRatedMovies = [];
    this._mostCommentedMovies = [];
    this._movies = null;
    this._sortedMovies = null;
    this._sortType = sortTypes.DEFAULT;

    this.isHide = false;

    this._api = api;

    this._container = container;
    this._sortComponent = new Sort();
    this._noFilmComponent = new NoFilm();
    this._showMoreBtnComponent = new ShowMoreBtn();

    this._filmContainer = this._container.getElement().querySelector(`.films-list__container`);
    this._currentFilmsRendered = FILM_COUNT_SHOW;

    this._sortComponent.setClickHandler(this._changeSortHandler.bind(this));
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._updateAllFilms = this._updateAllFilms.bind(this);

    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this.isHide = true;
    this._sortComponent.hide();
    this._container.hide();
  }

  show() {
    this.isHide = false;
    this._sortComponent.show();
    this._container.show();
  }

  render() {
    this._movies = this._moviesModel.getMovies();
    this._sortedMovies = getSortedFilms(this._movies, this._sortType, 0, this._movies.length);

    if (this._whenNoFilms()) {
      return;
    }

    const filmControllers = renderFilms(this._filmContainer, this._sortedMovies.slice(0, this._currentFilmsRendered), this._onDataChange, this._onViewChange, this._api, this._updateAllFilms);
    this._showedFilms = this._showedFilms.concat(filmControllers);
  }

  renderTopAndMostCommented() {
    this._allMovies = this._moviesModel.getAllMovies();

    this.renderTopRaited();
    this.renderMostCommented();
  }

  renderTopRaited() {
    this._allMovies = this._moviesModel.getAllMovies();
    const commonRating = this._allMovies.reduce((acc, movie) => {
      acc += movie.rate;
      return acc;
    }, 0);

    if (commonRating) {
      this._oldTopRatedComponent = this._topRatedComponent;
      const topRatedMovies = this._allMovies.slice()
                                          .sort((a, b) => (b.rate - a.rate))
                                          .slice(0, 2);

      if (!this._oldTopRatedComponent) {
        this._topRatedComponent = new TopRated();
        render(this._container.getElement(), this._topRatedComponent);
      }

      this._topRatedMovies = renderFilms(this._topRatedComponent.getContainer(), topRatedMovies, this._onDataChange, this._onViewChange, this._api, this._updateAllFilms);
    }
  }

  renderMostCommented() {
    this._allMovies = this._moviesModel.getAllMovies();
    const commonComments = this._allMovies.reduce((acc, movie) => {
      acc += movie.comments.length;
      return acc;
    }, 0);

    if (commonComments) {
      this._oldMostCommentedComponent = this._mostCommentedComponent;
      const MostCommentedMovies = this._allMovies.slice()
                                                .sort((a, b) => (b.comments.length - a.comments.length))
                                                .slice(0, 2);
      if (!this._oldMostCommentedComponent) {
        this._mostCommentedComponent = new MostCommented();
        render(this._container.getElement(), this._mostCommentedComponent);
      }
      this._mostCommentedMovies = renderFilms(this._mostCommentedComponent.getContainer(), MostCommentedMovies, this._onDataChange, this._onViewChange, this._api, this._updateAllFilms);
    }

  }

  rerenderTopAndMostCommented() {
    if (this._topRatedComponent) {
      this._topRatedMovies.forEach((movie) => movie.destroy());
      this.renderTopRaited();
    }
    if (this._mostCommentedComponent) {
      this._mostCommentedMovies.forEach((movie) => movie.destroy());
      this.renderMostCommented();
    }
  }


  renderShowMoreBtn() {
    const filmsList = this._container.getElement().querySelector(`.films-list`);
    render(filmsList, this._showMoreBtnComponent);
    this._showMoreBtnComponent.setClickHandler(() => {
      const sortedFilms = this._sortedMovies.slice();
      const prevFilmsRendered = this._currentFilmsRendered;
      this._currentFilmsRendered += FILM_COUNT_SHOW;
      const filmSortedControllers = renderFilms(this._filmContainer, sortedFilms.slice(prevFilmsRendered, this._currentFilmsRendered), this._onDataChange, this._onViewChange, this._api, this._updateAllFilms);
      this._showedFilms = this._showedFilms.concat(filmSortedControllers);

      if (this._currentFilmsRendered >= this._movies.length) {
        this._currentFilmsRendered = this._movies.length;
        remove(this._showMoreBtnComponent);
      }
    });
  }

  renderSort() {
    render(mainElem, this._sortComponent);
  }

  _changeSortHandler(sortType) {
    this._sortType = sortType;
    this._sortedMovies = getSortedFilms(this._movies, this._sortType, 0, this._movies.length);
    const sortedFilmsArray = this._sortedMovies.slice(0, this._currentFilmsRendered);
    this._removeMovies();
    const filmSortedControllers = renderFilms(this._filmContainer, sortedFilmsArray, this._onDataChange, this._onViewChange, this._api, this._updateAllFilms);
    this._showedFilms = this._showedFilms.concat(filmSortedControllers);
    if (this._sortedMovies.length > this._currentFilmsRendered) {
      this.renderShowMoreBtn();
    }
  }

  setDefaultSort() {
    if (this._sortType !== sortTypes.DEFAULT) {
      this._sortComponent.setDefaultSortActive();
      this._changeSortHandler(sortTypes.DEFAULT);
    }
  }

  _whenNoFilms() {
    if (this._movies.length === 0) {
      this._container.getElement().innerHTML = ``;
      render(this._container.getElement(), this._noFilmComponent);
      return true;
    }
    return false;
  }

  _updateAllFilms() {
    this._showedFilms.forEach((showedFilm) => showedFilm.destroy());
    this.render();
    this.rerenderTopAndMostCommented();
  }

  _onDataChange(filmController, oldData, newData) {
    const movieId = oldData.item;
    const newMovie = MovieAdapter.toRaw(newData);
    this._api.updateMovie(movieId, newMovie)
    .then((updatedData) => {
      const isOldData = this._moviesModel.updateMovie(movieId, updatedData);
      if (isOldData) {
        this._updateAllFilms();
      }
    });
  }


  _onViewChange() {
    this._showedFilms.forEach((movieController) => {
      movieController.setDefaultView();
    });
  }

  _removeMovies() {
    this._showedFilms.forEach((movieController) => movieController.destroy());
    remove(this._showMoreBtnComponent);
    this._showedFilms = [];
  }

  _updateMovies() {
    this._removeMovies();
    this.render();
    if (this._movies.length > this._currentFilmsRendered) {
      this.renderShowMoreBtn();
    }
  }

  _onFilterChange() {
    this._updateMovies();
  }

}
