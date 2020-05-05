
import AbstractComponent from "./abstractComponent.js";
import {getProfileRating} from "../util/other.js";

export default class UserProfile extends AbstractComponent {

  constructor(movies) {
    super();
    this._movies = movies.getAllMovies();
  }

  getTemplate() {

    const moviesWatchedLength = this._movies.filter((movie) => movie.watched).length;
    const profileRating = getProfileRating(moviesWatchedLength);
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${profileRating}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}
