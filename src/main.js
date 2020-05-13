const mainElem = document.querySelector(`.main`);
const footerElem = document.querySelector(`.footer`);

const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

import {render, replace, remove} from "./util/manipulate-dom.js";
import Loading from "./components/loading.js";
import Content from "./components/content.js";
import Statistics from "./components/statisctics.js";
import PageController from "./controllers/page-controller.js";
import FilterController from "./controllers/filter-controller.js";
import StatController from "./controllers/stat-controller";
import Movies from "./models/movies.js";
import API from "./api/api.js";
import Provider from "./api/provider.js";
import Store from "./api/store.js";

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});


const store = new Store(STORE_NAME, window.localStorage);
const api = new API(END_POINT);
const apiWithProvider = new Provider(api, store);

const moviesModel = new Movies();
const content = new Content();

const pageController = new PageController(content, moviesModel, apiWithProvider);
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
  pageController.renderUserProfile();
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
      pageController.setDefaultSort();
      statController.show();
    }
  });
};

apiWithProvider.getMovies()
.then((movies) => {
  moviesModel.setMovies(movies);
  renderContent();
});


