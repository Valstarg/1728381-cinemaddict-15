// Модель карточек.

// Импорты.

import AbstractObserver from '../utils/abstract-observer.js';

// Создание класса.

export default class FilmsModelComponent extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
    this._comments = new Map();
  }

  setFilms(typeUpdate, films) {
    this._films = films.slice();
    this._notify(typeUpdate);
  }

  addComment(typeUpdate, data) {
    this._comments.set(data.film.id, data.comments);
    this._notify(typeUpdate, data);
  }

  deleteComment(typeUpdate, data) {
    const prevComments = this._comments.get(data.filmId).slice();
    const commentIndex = prevComments.findIndex((comment) => comment.id === data.commentId);
    if (commentIndex === -1) {
      throw new Error('Can not delete unexisting comment');
    }
    prevComments.splice(commentIndex, 1);
    this._comments.set(data.filmId, prevComments);
    const filmIndex = this._films.findIndex((film) => film.id === data.filmId);
    if (filmIndex === -1) {
      throw new Error('Can not delete comment from unexisting film');
    }
    this._films[filmIndex] = { ...this._films[filmIndex], comments: prevComments };
    this._notify(typeUpdate, {
      film: this._films[filmIndex],
      comments: prevComments,
    });
  }

  getFilms() {
    return this._films;
  }

  updateFilms(typeUpdate, update) {
    const index = this._films.findIndex((film) => film.id === update.film.id);
    if (index === -1) {
      throw new Error('Can not update unexisting film');
    }
    this._films = [
      ...this._films.slice(0, index),
      update.film,
      ...this._films.slice(index + 1),
    ];
    this._notify(typeUpdate, update);
  }

  static userAdapter(film) {
    const adaptedFilm = {
      ...film,
      filmInfo: {
        title: film['film_info'].title,
        alternativeTitle: film['film_info']['alternative_title'],
        totalRating: film['film_info']['total_rating'],
        poster: film['film_info'].poster,
        ageRating: film['film_info']['age_rating'],
        director: film['film_info'].director,
        writers: film['film_info'].writers,
        actors: film['film_info'].actors,
        release: {
          date: film['film_info'].release.date,
          releaseCountry: film['film_info'].release['release_country'],
        },
        runtime: film['film_info'].runtime,
        genres: [...film['film_info'].genre],
        description: film['film_info'].description,
      },
      userDetails: {
        favorite: film['user_details'].favorite,
        watchlist: film['user_details'].watchlist,
        history: film['user_details']['already_watched'],
        watchingDate: film['user_details']['watching_date'],
      },
    };
    delete adaptedFilm['user_details'];
    delete adaptedFilm['film_info'];
    return adaptedFilm;
  }

  static serverAdapter(film) {
    const adaptedFilm = {
      ...film,
      comments: [],
      ['film_info']: {
        title: film.filmInfo.title,
        ['alternative_title']: film.filmInfo.alternativeTitle,
        ['total_rating']: film.filmInfo.totalRating,
        poster: film.filmInfo.poster,
        ['age_rating']: film.filmInfo.ageRating,
        director: film.filmInfo.director,
        writers: film.filmInfo.writers,
        actors: film.filmInfo.actors,
        release: {
          date: film.filmInfo.release.date,
          ['release_country']: film.filmInfo.release.releaseCountry,
        },
        runtime: film.filmInfo.runtime,
        genre: [...film.filmInfo.genres],
        description: film.filmInfo.description,
      },
      ['user_details']: {
        favorite: film.userDetails.favorite,
        watchlist: film.userDetails.watchlist,
        ['already_watched']: film.userDetails.history,
        ['watching_date']: film.userDetails.watchingDate,
      },
    };
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;
    return adaptedFilm;
  }

  static commentUserAdapter(comment) {
    const adaptedComment = {
      ...comment,
      authorName: comment.author,
      text: comment.comment,
      emoji: comment.emotion,
    };
    delete adaptedComment.emotion;
    delete adaptedComment.author;
    delete adaptedComment.comment;
    delete adaptedComment.movie;
    return adaptedComment;
  }

  static commentServerAdapter(comment) {
    const adaptedComment = {
      ...comment,
      comment: comment.text,
      emotion: comment.emoji,
    };
    delete adaptedComment.emoji;
    delete adaptedComment.authorName;
    delete adaptedComment.text;
    delete adaptedComment.author;
    return adaptedComment;
  }
}
