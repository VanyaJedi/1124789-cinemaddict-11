import MovieAdapter from "../models/movies-adapter.js";

const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSyncNedeed = false;
  }

  getMovies() {
    if (isOnline()) {
      return this._api.getMovies()
      .then((movies) => {
        movies.forEach((movie) => {
          this._store.setItem(`movies`, movie.item, MovieAdapter.toRaw(movie));
        });
        return movies;
      });
    }

    const rawStoreMovies = Object.values(this._store.getItems().movies);
    const storeMovies = rawStoreMovies.map((rawMovie) => MovieAdapter.parseMovie(rawMovie));
    return Promise.resolve(storeMovies);
  }

  getComments(id) {
    if (isOnline()) {
      return this._api.getComments(id).
      then((comments) => {
        this._store.setItem(`comments`, id, comments);
        return comments;
      });
    }
    let storeComments;
    try {
      storeComments = Object.values(this._store.getItems().comments[id]);
    } catch (err) {
      storeComments = [];
    }

    return Promise.resolve(storeComments);

  }

  updateMovie(id, data) {
    if (isOnline()) {
      return this._api.updateMovie(id, data);
    }
    this._store.setItem(`movies`, id, data);
    this._isSyncNedeed = true;
    const newMovieAdapterItem = new MovieAdapter(data);
    return Promise.resolve(newMovieAdapterItem);

  }

  addComment(id, data) {
    return this._api.addComment(id, data);
  }

  deleteComment(id) {
    return this._api.deleteComment(id);
  }

  sync() {
    if (isOnline()) {
      if (this._isSyncNedeed) {
        const storeMovies = Object.values(this._store.getItems().movies);
        return this._api.sync(storeMovies)
            .then((response) => {
              response.updated.forEach((movie) => {
                this._store.setItem(`movies`, movie.id, movie);
              });
            });
      } else {
        return Promise.resolve();
      }
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

}
