
import moment from "moment";

const MomentFormat = {
  DD: `DD`,
  MMMM: `MMMM`,
  YYYY: `YYYY`,
  DAY: `day`,
  H: `H`,
  MM: `mm`
};

export default class MovieAdapter {
  constructor(movie) {
    this.item = movie.id;
    this.poster = movie.film_info.poster;
    this.name = movie.film_info.title;
    this.originalName = movie.film_info.alternative_title;
    this.rate = movie.film_info.total_rating;
    this.director = movie.film_info.director;
    this.authors = movie.film_info.writers;
    this.actors = movie.film_info.actors;
    this.releaseDate = {
      date: movie.film_info.release.date,
      day: moment(movie.film_info.release.date).format(MomentFormat.DD),
      month: moment(movie.film_info.release.date).format(MomentFormat.MMMM),
      year: moment(movie.film_info.release.date).format(MomentFormat.YYYY)
    };
    this.rawDuration = movie.film_info.runtime;
    this.duration = `${moment.utc().startOf(MomentFormat.DAY).add({minutes: movie.film_info.runtime}).format(MomentFormat.H)}h ${moment.utc().startOf(MomentFormat.DAY).add({minutes: movie.film_info.runtime}).format(MomentFormat.MM)}m`;
    this.country = movie.film_info.release.release_country;
    this.genres = movie.film_info.genre;
    this.desc = movie.film_info.description;
    this.comments = movie.comments;
    this.ageRate = movie.film_info.age_rating;
    this.addToWatchlist = movie.user_details.watchlist;
    this.watched = movie.user_details.already_watched;
    this.favourites = movie.user_details.favorite;
    this.watchingDate = movie.user_details.watching_date;
  }

  static toRaw(data) {
    return {
      "id": data.item,
      "film_info": {
        "actors": data.actors,
        "age_rating": data.ageRate,
        "alternative_title": data.originalName,
        "description": data.desc,
        "director": data.director,
        "genre": data.genres,
        "poster": data.poster,
        "release": {
          "date": data.releaseDate.date,
          "release_country": data.country
        },
        "runtime": data.rawDuration,
        "title": data.name,
        "total_rating": data.rate,
        "writers": data.authors
      },
      "user_details": {
        "already_watched": data.watched,
        "favorite": data.favourites,
        "watching_date": data.watchingDate,
        "watchlist": data.addToWatchlist
      },
      "comments": data.comments
    };
  }

  static parseMovie(movie) {
    return new MovieAdapter(movie);
  }

}
