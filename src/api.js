
import MovieAdapter from "./models/moviesAdapter.js";

const AUTH_PUT = `Basic er883jdzbdw`;
const AUTH_GET = `Basic kTy9gIdsz2317rD`;

export default class API {

  constructor(endPoint, auth) {
    this._endPoint = endPoint;
    this._auth = auth;
    this._movies = [];
    this._comments = [];
  }

  _load({url, method = `GET`, body = null, headers = new Headers()}, auth) {
    headers.append(`Authorization`, auth);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(this._checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  _onError() {
    return [];
  }

  getMovies() {
    return this._load({url: `movies`}, AUTH_GET)
      .then((movies) => {
        this._movies = movies;
        return this._movies.map((it) => {
          return this._load({url: `comments/${it.id}`}, AUTH_GET);
        });
      })
      .then((commentPromise) => Promise.all(commentPromise))
      .then((commentResponse) => {
        this._comments = commentResponse;
        return this._movies.map((it) => {
          return new MovieAdapter(it, this._comments[it.id]).adaptAndReturnData();
        });
      })
      .catch(this._onError);
  }

  updateMovie(id, data) {
    const movieToUpdate = new MovieAdapter();
    //console.log(JSON.stringify(movieToUpdate.adaptMovieToRawAndReturn(data)));
    return this._load({
      url: `movies/${id}`,
      method: `PUT`,
      body: JSON.stringify(movieToUpdate.adaptMovieToRawAndReturn(data)),
      headers: new Headers({"Content-Type": `application/json`})
    }, AUTH_PUT);
  }

}
