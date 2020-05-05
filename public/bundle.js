/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/content.js":
/*!***********************************!*\
  !*** ./src/components/content.js ***!
  \***********************************/
/*! exports provided: createContentTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createContentTemplate", function() { return createContentTemplate; });
const createContentTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">
        </div>
      </section>
      </section>
    </section>`
  );
};


/***/ }),

/***/ "./src/components/filmCard.js":
/*!************************************!*\
  !*** ./src/components/filmCard.js ***!
  \************************************/
/*! exports provided: createFilmCardTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmCardTemplate", function() { return createFilmCardTemplate; });
const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};


/***/ }),

/***/ "./src/components/menu.js":
/*!********************************!*\
  !*** ./src/components/menu.js ***!
  \********************************/
/*! exports provided: createMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMenuTemplate", function() { return createMenuTemplate; });
const createMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


/***/ }),

/***/ "./src/components/mostCommented.js":
/*!*****************************************!*\
  !*** ./src/components/mostCommented.js ***!
  \*****************************************/
/*! exports provided: mostCommentedTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mostCommentedTemplate", function() { return mostCommentedTemplate; });
const mostCommentedTemplate = () => {
  return (
    ` <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>

        <div class="films-list__container">
          <article class="film-card">
            <h3 class="film-card__title">Santa Claus Conquers the Martians</h3>
            <p class="film-card__rating">2.3</p>
            <p class="film-card__info">
              <span class="film-card__year">1964</span>
              <span class="film-card__duration">1h 21m</span>
              <span class="film-card__genre">Comedy</span>
            </p>
            <img src="./images/posters/santa-claus-conquers-the-martians.jpg" alt="" class="film-card__poster">
            <p class="film-card__description">The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…</p>
            <a class="film-card__comments">465 comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
            </form>
          </article>

          <article class="film-card">
            <h3 class="film-card__title">Made for Each Other</h3>
            <p class="film-card__rating">5.8</p>
            <p class="film-card__info">
              <span class="film-card__year">1939</span>
              <span class="film-card__duration">1h 32m</span>
              <span class="film-card__genre">Comedy</span>
            </p>
            <img src="./images/posters/made-for-each-other.png" alt="" class="film-card__poster">
            <p class="film-card__description">John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…</p>
            <a class="film-card__comments">56 comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
            </form>
          </article>
        </div>
      </section>
    `
  );
};


/***/ }),

/***/ "./src/components/showMoreBtn.js":
/*!***************************************!*\
  !*** ./src/components/showMoreBtn.js ***!
  \***************************************/
/*! exports provided: createShowMoreTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShowMoreTemplate", function() { return createShowMoreTemplate; });
const createShowMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button> `;
};


/***/ }),

/***/ "./src/components/sort.js":
/*!********************************!*\
  !*** ./src/components/sort.js ***!
  \********************************/
/*! exports provided: createSortTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSortTemplate", function() { return createSortTemplate; });
const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
     </ul>`
  );
};


/***/ }),

/***/ "./src/components/statisctics.js":
/*!***************************************!*\
  !*** ./src/components/statisctics.js ***!
  \***************************************/
/*! exports provided: createStatisticsTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStatisticsTemplate", function() { return createStatisticsTemplate; });
const createStatisticsTemplate = () => {
  return (
    ` <section class="footer__statistics">
        <p>130 291 movies inside</p>
      </section>
    `
  );
};


/***/ }),

/***/ "./src/components/topRated.js":
/*!************************************!*\
  !*** ./src/components/topRated.js ***!
  \************************************/
/*! exports provided: topRatedTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "topRatedTemplate", function() { return topRatedTemplate; });
const topRatedTemplate = () => {
  return (
    ` <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>

        <div class="films-list__container">
          <article class="film-card">
            <h3 class="film-card__title">The Man with the Golden Arm</h3>
            <p class="film-card__rating">9.0</p>
            <p class="film-card__info">
              <span class="film-card__year">1955</span>
              <span class="film-card__duration">1h 59m</span>
              <span class="film-card__genre">Drama</span>
            </p>
            <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
            <p class="film-card__description">Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…</p>
            <a class="film-card__comments">18 comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
            </form>
          </article>

          <article class="film-card">
            <h3 class="film-card__title">The Great Flamarion</h3>
            <p class="film-card__rating">8.9</p>
            <p class="film-card__info">
              <span class="film-card__year">1945</span>
              <span class="film-card__duration">1h 18m</span>
              <span class="film-card__genre">Mystery</span>
            </p>
            <img src="./images/posters/the-great-flamarion.jpg" alt="" class="film-card__poster">
            <p class="film-card__description">The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…</p>
            <a class="film-card__comments">12 comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
            </form>
          </article>
        </div>
      </section>
    `
  );
};


/***/ }),

/***/ "./src/components/userProfile.js":
/*!***************************************!*\
  !*** ./src/components/userProfile.js ***!
  \***************************************/
/*! exports provided: createUserProfileTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUserProfileTemplate", function() { return createUserProfileTemplate; });
const createUserProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_content_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/content.js */ "./src/components/content.js");
/* harmony import */ var _components_filmCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/filmCard */ "./src/components/filmCard.js");
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/menu.js */ "./src/components/menu.js");
/* harmony import */ var _components_mostCommented_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/mostCommented.js */ "./src/components/mostCommented.js");
/* harmony import */ var _components_showMoreBtn_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/showMoreBtn.js */ "./src/components/showMoreBtn.js");
/* harmony import */ var _components_statisctics_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/statisctics.js */ "./src/components/statisctics.js");
/* harmony import */ var _components_topRated_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/topRated.js */ "./src/components/topRated.js");
/* harmony import */ var _components_userProfile_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/userProfile.js */ "./src/components/userProfile.js");
/* harmony import */ var _components_sort_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/sort.js */ "./src/components/sort.js");
const headerElem = document.querySelector(`.header`);
const mainElem = document.querySelector(`.main`);
const footerElem = document.querySelector(`.footer`);
const FILM_COUNT = 5;


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};











render(headerElem, Object(_components_userProfile_js__WEBPACK_IMPORTED_MODULE_7__["createUserProfileTemplate"])());
render(mainElem, Object(_components_menu_js__WEBPACK_IMPORTED_MODULE_2__["createMenuTemplate"])());
render(mainElem, Object(_components_sort_js__WEBPACK_IMPORTED_MODULE_8__["createSortTemplate"])());
render(mainElem, Object(_components_content_js__WEBPACK_IMPORTED_MODULE_0__["createContentTemplate"])());

const filmsList = document.querySelector(`.films-list`);
const filmsContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsContainer, Object(_components_filmCard__WEBPACK_IMPORTED_MODULE_1__["createFilmCardTemplate"])());
}

render(filmsList, Object(_components_showMoreBtn_js__WEBPACK_IMPORTED_MODULE_4__["createShowMoreTemplate"])());
render(filmsContainer, Object(_components_topRated_js__WEBPACK_IMPORTED_MODULE_6__["topRatedTemplate"])());
render(filmsContainer, Object(_components_mostCommented_js__WEBPACK_IMPORTED_MODULE_3__["mostCommentedTemplate"])());
render(footerElem, Object(_components_statisctics_js__WEBPACK_IMPORTED_MODULE_5__["createStatisticsTemplate"])());


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map