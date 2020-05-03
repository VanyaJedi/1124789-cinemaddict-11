const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);
const footerElem = document.querySelector(`.footer`);
const FILM_COUNT = 23;
const films = [];

const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

import {render, replace, remove} from "./util/manipulateDOM.js";
import Loading from "./components/loading.js";
import Content from "./components/content.js";
import Statistics from "./components/statisctics.js";
import UserProfile from "./components/userProfile.js";
import {generateFilmCard} from "./mock/testData.js";
import PageController from "./controllers/pageController.js";
import FilterController from "./controllers/filterController.js";
import StatController from "./controllers/statController";
import Movies from "./models/movies.js";
import API from "./api.js";

for (let i = 0; i < FILM_COUNT; i++) {
  films.push(generateFilmCard(i));
}

const api = new API(END_POINT);

const moviesModel = new Movies();
const content = new Content();

const pageController = new PageController(content, moviesModel, api);
const filterController = new FilterController(mainElem, moviesModel);
const statisticsEmpty = new Statistics(moviesModel);
const loading = new Loading();

filterController.render();
pageController.renderSort();
render(mainElem, loading);
render(footerElem, statisticsEmpty);

const renderContent = () => {
  remove(loading);
  const statistics = new Statistics(moviesModel);
  replace(statistics, statisticsEmpty);
  const statController = new StatController(mainElem, moviesModel);
  const userProfile = new UserProfile(moviesModel);
  render(headerElem, userProfile);
  filterController.updateComponent(moviesModel);
  pageController.renderSort();
  render(mainElem, content);
  pageController.render();
  pageController.renderTopAndMostCommented();
  pageController.renderShowMoreBtn();
  statController.render();
  filterController.setViewChangeHandler(()=>{
    if (pageController.isHide) {
      pageController.show();
      statController.hide();
    } else {
      pageController.hide();
      statController.show();
    }
  });
};

api.getMovies()
.then((movies) => {
  moviesModel.setMovies(movies);
  renderContent();
});


