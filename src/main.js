const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);
const footerElem = document.querySelector(`.footer`);
const FILM_COUNT = 23;
const films = [];

import {render} from "./util/manipulateDOM.js";
import Content from "./components/content.js";
import Menu from "./components/menu.js";
import Statistics from "./components/statisctics.js";
import UserProfile from "./components/userProfile.js";
import Sort from "./components/sort.js";
import {generateFilmCard} from "./mock/testData.js";
import PageController from "./controllers/pageController.js";

for (let i = 0; i < FILM_COUNT; i++) {
  films.push(generateFilmCard(i));
}

const userProfile = new UserProfile();
const menu = new Menu(films);
const sort = new Sort();
const content = new Content();

render(headerElem, userProfile);
render(mainElem, menu);
render(mainElem, sort);
render(mainElem, content);

const pageController = new PageController(content);
pageController.render(films);

const statisctics = new Statistics(films);
render(footerElem, statisctics);

