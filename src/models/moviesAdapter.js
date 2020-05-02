
import moment from "moment";

export default class MovieAdapter {
  constructor(movie, comment) {
    this._movie = movie;
    this._comment = comment;
  }

  adaptAndReturnData() {
    return {
      item: this._movie.id,
      poster: this._movie.film_info.poster,
      name: this._movie.film_info.title,
      originalName: this._movie.film_info.alternative_title,
      rate: this._movie.film_info.total_rating,
      director: this._movie.film_info.director,
      authors: this._movie.film_info.writers,
      actors: this._movie.film_info.actors,
      releaseDate: {
        date: this._movie.film_info.release.date,
        day: moment(this._movie.film_info.release.date).format(`DD`),
        month: moment(this._movie.film_info.release.date).format(`MMMM`),
        year: moment(this._movie.film_info.release.date).format(`YYYY`)
      },
      rawDuration: this._movie.film_info.runtime,
      duration: `${moment.utc().startOf(`day`).add({minutes: this._movie.film_info.runtime}).format(`H`)}h ${moment.utc().startOf(`day`).add({minutes: this._movie.film_info.runtime}).format(`mm`)}m`,
      country: this._movie.film_info.release.release_country,
      genres: this._movie.film_info.genre,
      desc: this._movie.film_info.description,
      comments: this._comment,
      ageRate: this._movie.film_info.age_rating,
      addToWatchlist: this._movie.user_details.watchlist,
      watched: this._movie.user_details.already_watched,
      favourites: this._movie.user_details.favorite,
      watchingDate: this._movie.user_details.watching_date
    };
  }

  adaptMovieToRawAndReturn(movie) {
    return {
      id: movie.item,
      comments: movie.comments.map((it) => it.id),
      film_info: {
        actors: movie.actors,
        age_rating: movie.ageRate,
        alternative_title: movie.originalName,
        description: movie.desc,
        director: movie.director,
        genre: movie.genres,
        poster: movie.poster,
        release: {
          date: movie.releaseDate.date,
          release_country: movie.country
        },
        runtime: movie.rawDuration,
        title: movie.name,
        total_rating: movie.rate
      },
      user_details: {
        already_watched: movie.watched,
        favorite: movie.favourites,
        watching_date: movie.watchingDate,
        watchlist: movie.addToWatchlist
      }
    };
  }

}
