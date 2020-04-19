import {render, remove} from "../util/manipulateDOM.js";
import {sortTypes} from "../util.js";
import ShowMoreBtn from "../components/showMoreBtn.js";
import TopRated from "../components/topRated.js";
import MostCommented from "../components/mostCommented.js";
import FilmPopup from "../components/filmPopup.js";
import FilmCard from "../components/filmCard.js";
import NoFilm from "../components/nofilm.js";
import Menu from "../components/menu.js";
import Sort from "../components/sort.js";

const FILM_COUNT_SHOW = 5;
const FILMS_LENGTH_TEST = 0;
const mainElem = document.querySelector(`.main`);


export default class PageController {
  constructor(container) {
    this._container = container;
  }


  render(films) {
    const menu = new Menu(films);
    const sort = new Sort();

    render(mainElem, sort, `afterbegin`);
    render(mainElem, menu, `afterbegin`);

    let sortedFilms = films.slice();
    const filmsSection = this._container.getElement();
    if ((FILMS_LENGTH_TEST) === 0) {
      filmsSection.innerHTML = ``;
      const noFilmSection = new NoFilm();
      render(filmsSection, noFilmSection);
      return;
    }
    const filmsList = filmsSection.querySelector(`.films-list`);
    const filmsContainer = filmsSection.querySelector(`.films-list__container`);

    for (let i = 0; i < FILM_COUNT_SHOW; i++) {
      render(filmsContainer, new FilmCard(films[i]));
    }

    const showMoreBtn = new ShowMoreBtn();
    const topRated = new TopRated(films);
    const mostCommented = new MostCommented(films);

    render(filmsList, showMoreBtn);
    render(filmsSection, topRated);
    render(filmsSection, mostCommented);


    const clickFilmHandler = function (evt) {
      if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
        const address = evt.target.parentNode.dataset.address;
        const filmPopup = new FilmPopup(films[address]);
        render(document.body, filmPopup);
        document.body.classList.add(`hide-overflow`);

        const closeBtnHandler = function () {
          document.querySelector(`.film-details`).remove();
          document.body.classList.remove(`hide-overflow`);
        };

        const onEscKeyDownClosePopup = (btnEvt) => {
          const isEscKey = btnEvt.key === `Escape` || btnEvt.key === `Esc`;

          if (isEscKey) {
            closeBtnHandler();
            document.removeEventListener(`keydown`, onEscKeyDownClosePopup);
          }
        };
        document.addEventListener(`keydown`, onEscKeyDownClosePopup);
        filmPopup.setCloseBtnHandler(closeBtnHandler);
      }
    };

    filmsSection.addEventListener(`click`, clickFilmHandler);

    const getSortedFilms = (filmsArray, sortType, from, to) => {
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

    let currentFilmsRendered = FILM_COUNT_SHOW;

    const clickSortHandler = function (sortType) {
      const sortedFilmsArray = getSortedFilms(films, sortType, 0, currentFilmsRendered);
      filmsContainer.innerHTML = ``;
      for (let i = 0; i < currentFilmsRendered; i++) {
        render(filmsContainer, new FilmCard(sortedFilmsArray[i]));
      }
    };

    sort.setClickHandler(clickSortHandler);

    const showMoreFilms = function () {
      const prevFilmsRendered = currentFilmsRendered;
      currentFilmsRendered += FILM_COUNT_SHOW;

      sortedFilms.slice(prevFilmsRendered, currentFilmsRendered)
        .forEach((film) => render(filmsContainer, new FilmCard(film)));

      if (currentFilmsRendered >= films.length) {
        currentFilmsRendered = films.length;
        remove(showMoreBtn);
      }
    };

    showMoreBtn.setClickHandler(showMoreFilms);
  }
}
