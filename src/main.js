const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);
const footerElem = document.querySelector(`.footer`);
const FILM_COUNT = 5;


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

render(headerElem, createUserProfileTemplate());
render(mainElem, createMenuTemplate());
render(mainElem, createSortTemplate());
render(mainElem, createContentTemplate());

const filmsList = document.querySelector(`.films-list`);
const filmsContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsContainer, createFilmCardTemplate());
}

render(filmsList, createShowMoreTemplate());
render(filmsContainer, topRatedTemplate());
render(filmsContainer, mostCommentedTemplate());
render(footerElem, createStatisticsTemplate());
