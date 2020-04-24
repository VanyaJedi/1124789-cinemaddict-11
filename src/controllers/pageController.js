import {render, remove} from "../util/manipulateDOM.js";
import {sortTypes} from "../util.js";
import ShowMoreBtn from "../components/showMoreBtn.js";
import TopRated from "../components/topRated.js";
import MostCommented from "../components/mostCommented.js";
import NoFilm from "../components/nofilm.js";
import Menu from "../components/menu.js";
import Sort from "../components/sort.js";

import MovieController from "./movieController.js";

const FILM_COUNT_SHOW = 5;
const FILMS_LENGTH_TEST = 1;
const mainElem = document.querySelector(`.main`);

const getSortedFilms = (filmsArray, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = filmsArray.slice();

  switch (sortType) {
    case sortTypes.BY_DATE:
      sortedFilms = showingFilms.sort((a, b) => b.releaseDate.date - a.releaseDate.date);
      break;
    case sortTypes.BY_RATE:
      sortedFilms = showingFilms.sort((a, b) => b.rate - a.rate);
      break;
    case sortTypes.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

const renderFilms = (filmsList, films, onDataChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsList, onDataChange);
    movieController.render(film);

    return movieController;
  });
};


export default class PageController {
  constructor(container) {

    this._films = [];
    this._showedFilms = [];

    this._container = container;
    this._sortComponent = new Sort();
    this._noFilmComponent = new NoFilm();
    this._showMoreBtnComponent = new ShowMoreBtn();

    this._filmContainer = this._container.getElement().querySelector(`.films-list__container`);
    this._currentFilmsRendered = FILM_COUNT_SHOW;

    this._sortComponent.setClickHandler(this._changeSortHandler.bind(this));
    this._onDataChange = this._onDataChange.bind(this);
  }


  render(films) {
    this._films = films;
    const menu = new Menu(this._films);
    render(mainElem, this._sortComponent, `afterbegin`);
    render(mainElem, menu, `afterbegin`);

    if (this._whenNoFilms()) {
      return;
    }

    let sortedFilms = this._films.slice();
    const filmsSection = this._container.getElement();
    const filmsList = filmsSection.querySelector(`.films-list`);

    const filmControllers = renderFilms(this._filmContainer, this._films.slice(0, this._currentFilmsRendered), this._onDataChange);
    this._showedFilms = this._showedFilms.concat(filmControllers);

    const topRated = new TopRated(films);
    const mostCommented = new MostCommented(films);

    render(filmsList, this._showMoreBtnComponent);
    render(filmsSection, topRated);
    render(filmsSection, mostCommented);

    this._showMoreBtnComponent.setClickHandler(() => {
      const prevFilmsRendered = this._currentFilmsRendered;
      this._currentFilmsRendered += FILM_COUNT_SHOW;

      const filmSortedControllers = renderFilms(this._filmContainer, sortedFilms.slice(prevFilmsRendered, this._currentFilmsRendered), this._onDataChange);
      this._showedFilms = this._showedFilms.concat(filmSortedControllers);

      if (this._currentFilmsRendered >= films.length) {
        this._currentFilmsRendered = films.length;
        remove(this._showMoreBtnComponent);
      }
    });
  }

  _changeSortHandler(sortType) {
    const sortedFilmsArray = getSortedFilms(this._films, sortType, 0, this._currentFilmsRendered);
    this._filmContainer.innerHTML = ``;
    renderFilms(this._filmContainer, sortedFilmsArray, this._onDataChange);
  }

  _whenNoFilms() {
    if ((FILMS_LENGTH_TEST) === 0) {
      this._container.getElement().innerHTML = ``;
      render(this._container.getElement(), this._noFilmComponent);
      return true;
    }
    return false;
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    filmController.render(this._films[index]);
  }
}
