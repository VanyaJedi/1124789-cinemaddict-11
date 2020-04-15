const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);
const footerElem = document.querySelector(`.footer`);
const FILM_COUNT = 23;
const FILM_COUNT_SHOW = 5;
const films = [];

import {render} from "./util.js";
import Content from "./components/content.js";
import FilmCard from "./components/filmCard.js";
import Menu from "./components/menu.js";
import MostCommented from "./components/mostCommented.js";
import ShowMoreBtn from "./components/showMoreBtn.js";
import Statistics from "./components/statisctics.js";
import TopRated from "./components/topRated.js";
import UserProfile from "./components/userProfile.js";
import Sort from "./components/sort.js";
import {generateFilmCard} from "./mock/testData.js";
import FilmPopup from "./components/filmPopup.js";

for (let i = 0; i < FILM_COUNT; i++) {
  films.push(generateFilmCard(i));
}
render(headerElem, new UserProfile().getElement());
render(mainElem, new Menu(films).getElement());
render(mainElem, new Sort().getElement());
render(mainElem, new Content().getElement());

const filmsSection = document.querySelector(`.films`);
const filmsList = document.querySelector(`.films-list`);
const filmsContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT_SHOW; i++) {
  render(filmsContainer, new FilmCard(films[i]).getElement());
}

render(filmsList, new ShowMoreBtn().getElement());
render(filmsSection, new TopRated(films).getElement());
render(filmsSection, new MostCommented(films).getElement());
render(footerElem, new Statistics(films).getElement());

const clickFilmHandler = function (evt) {
  if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
    const address = evt.target.parentNode.dataset.address;
    const filmPopup = new FilmPopup(films[address]);
    render(document.body, filmPopup.getElement());
    document.body.classList.add(`hide-overflow`);
    const closeBtn = filmPopup.getElement().querySelector(`.film-details__close-btn`);
    const closeBtnHandler = function () {
      document.querySelector(`.film-details`).remove();
      document.body.classList.remove(`hide-overflow`);
    };
    closeBtn.addEventListener(`click`, closeBtnHandler);
  }
};

filmsSection.addEventListener(`click`, clickFilmHandler);

const showMoreBtn = document.querySelector(`.films-list__show-more`);

let currentFilmsRendered = FILM_COUNT_SHOW;
const showMoreFilms = function () {
  const prevFilmsRendered = currentFilmsRendered;
  currentFilmsRendered += FILM_COUNT_SHOW;

  films.slice(prevFilmsRendered, currentFilmsRendered)
    .forEach((film) => render(filmsContainer, new FilmCard(film).getElement()));

  if (currentFilmsRendered >= films.length) {
    showMoreBtn.remove();
  }
};

showMoreBtn.addEventListener(`click`, showMoreFilms);
