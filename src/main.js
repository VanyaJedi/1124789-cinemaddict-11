const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);
const footerElem = document.querySelector(`.footer`);
const FILM_COUNT = 23;
const FILM_COUNT_SHOW = 5;
const films = [];


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

import {createContentTemplate} from "./components/content.js";
import {createFilmCardTemplate} from "./components/filmCard";
import {createMenuTemplate} from "./components/menu.js";
import {mostCommentedTemplate} from "./components/mostCommented.js";
import {createShowMoreTemplate} from "./components/showMoreBtn.js";
import {createStatisticsTemplate} from "./components/statisctics.js";
import {topRatedTemplate} from "./components/topRated.js";
import {createUserProfileTemplate} from "./components/userProfile.js";
import {createSortTemplate} from "./components/sort.js";
import {generateFilmCard} from "./mock/testData.js";
import {createFilmPopup} from "./components/filmPopup.js";

for (let i = 0; i < FILM_COUNT; i++) {
  films.push(generateFilmCard());
}

render(headerElem, createUserProfileTemplate());
render(mainElem, createMenuTemplate(films));
render(mainElem, createSortTemplate());
render(mainElem, createContentTemplate());

const filmsList = document.querySelector(`.films-list`);
const filmsContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT_SHOW; i++) {
  render(filmsContainer, createFilmCardTemplate(films[i]));
}

render(filmsList, createShowMoreTemplate());
render(filmsContainer, topRatedTemplate(films));
render(filmsContainer, mostCommentedTemplate(films));
render(footerElem, createStatisticsTemplate(films));

const clickFilmHandler = function (evt) {
  if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
    render(document.body, createFilmPopup(films[0]));
    document.body.classList.add(`hide-overflow`);
    const closeBtn = document.querySelector(`.film-details__close-btn`);
    const closeBtnHandler = function () {
      document.querySelector(`.film-details`).remove();
      document.body.classList.remove(`hide-overflow`);
    };
    closeBtn.addEventListener(`click`, closeBtnHandler);
  }
};

filmsContainer.addEventListener(`click`, clickFilmHandler);

const showMoreBtn = document.querySelector(`.films-list__show-more`);

let currentFilmsRendered = FILM_COUNT_SHOW;
const showMoreFilms = function () {
  const prevFilmsRendered = currentFilmsRendered;
  currentFilmsRendered += FILM_COUNT_SHOW;

  films.slice(prevFilmsRendered, currentFilmsRendered)
    .forEach((film) => render(filmsContainer, createFilmCardTemplate(film)));

  if (currentFilmsRendered >= films.length) {
    showMoreBtn.remove();
  }
};

showMoreBtn.addEventListener(`click`, showMoreFilms);
