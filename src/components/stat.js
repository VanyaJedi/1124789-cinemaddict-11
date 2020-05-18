import AbstractComponent from "./abstract-component.js";
import {getProfileRating, generateGenresObject} from "../util/other.js";

const MINUTES_IN_HOUR = 60;

const getTopGenre = (movies) => {
  const genreCountObject = generateGenresObject(movies);
  let topGenreName = ``;
  let topGenreMax = -1;

  Object.entries(genreCountObject).forEach(([key, value]) => {
    if (value > topGenreMax) {
      topGenreName = key;
      topGenreMax = value;
    }
  });
  return topGenreName;
};

const createDurationTemplate = (duration) => {
  const hours = Math.floor(duration / MINUTES_IN_HOUR);
  const minutes = duration % MINUTES_IN_HOUR;
  return `${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span>`;
};

const createStatTemplate = (movies) => {
  const moviesWatched = movies.filter((movie) => movie.watched);
  const moviesWatchedLength = moviesWatched.length;
  const profileRating = getProfileRating(moviesWatchedLength);
  const totalDuration = moviesWatched.reduce((prev, curr) => {
    prev += curr.rawDuration;
    return prev;
  }, 0);

  const durationTemplate = createDurationTemplate(totalDuration);
  const topGenre = getTopGenre(moviesWatched);

  return (
    `<section class="statistic visually-hidden">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${profileRating}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text statistic__item-length">${moviesWatchedLength}<span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text statistic__item-duration">${durationTemplate}</p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text statistic__item-top-genre">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
  </section>`);

};

export default class Stat extends AbstractComponent {

  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createStatTemplate(this._movies);
  }

  setFilterHandlers(handler) {
    const filtersInput = this.getElement().querySelectorAll(`.statistic__filters-input`);
    Array.from(filtersInput).forEach((input) => {
      input.addEventListener(`change`, handler);
    });
  }

  updateMoviesData(movies) {
    const moviesWatched = movies.filter((movie) => movie.watched);
    const moviesWatchedLength = moviesWatched.length;
    const totalDuration = moviesWatched.reduce((prev, curr) => {
      prev += curr.rawDuration;
      return prev;
    }, 0);
    const topGenre = getTopGenre(moviesWatched);
    const durationTemplate = createDurationTemplate(totalDuration);

    this.getElement().querySelector(`.statistic__item-length`).innerHTML = `${moviesWatchedLength}<span class="statistic__item-description">movies</span>`;
    this.getElement().querySelector(`.statistic__item-duration`).innerHTML = durationTemplate;
    this.getElement().querySelector(`.statistic__item-top-genre`).innerText = topGenre;
  }
}
