
import MovieAdapter from "./models/moviesAdapter.js";
import commentsAdapter from "./models/commentsAdapter.js";

const AUTH_PUT = `Basic er883jdzbdw`;


export default class API {

  constructor(endPoint) {
    this._endPoint = endPoint;
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
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  _onError() {
    return [];
  }

  getMovies() {
    return this._load({url: `movies`}, AUTH_PUT)
      .then((response) => response.json())
      .then((moviesFromServer) => {
        return moviesFromServer.map((rawMovie) => {
          return MovieAdapter.parseMovie(rawMovie);
        });
      })
      .catch(this._onError);
  }

  getComments(id) {
    return this._load({url: `comments/${id}`}, AUTH_PUT)
    .then((response) => response.json())
    .then((comments) => {
      return comments.map((comment) => {
        return commentsAdapter.parseComment(comment);
      });
    })
    .catch(this._onError);
  }

  updateMovie(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: `PUT`,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    }, AUTH_PUT)
    .then((response) => response.json())
    .then((updatedData) => {
      return new MovieAdapter(updatedData);
    })
    .catch(this._onError);
  }

  addComment(id, data) {
    return this._load({
      url: `comments/${id}`,
      method: `POST`,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    }, AUTH_PUT)
    .then((response) => response.json())
    .then((newComments) => {
      return newComments.comments.map((comment) => commentsAdapter.parseComment(comment));
    });
  }

  deleteComment(id) {
    return this._load({
      url: `commentss/${id}`,
      method: `DELETE`,
      headers: new Headers({"Content-Type": `application/json`})
    }, AUTH_PUT);
  }
}
