// API

// Импорты.

import FilmsModel from '../model/mod-films.js';

// Переменные.

const AUTHORIZATION = 'Basic df5ggidfsdfds9f8956df4';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const request = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

// Создание класса.

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: 'movies'})
      .then(Api.toJSON)
      .then((movies) => movies.map(FilmsModel.userAdapter));
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(Api.toJSON)
      .then((comments) => comments.map(FilmsModel.commentUserAdapter));
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: request.PUT,
      body: JSON.stringify(FilmsModel.serverAdapter(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(FilmsModel.userAdapter);
  }

  addComment(filmId, comments) {
    return this._load({
      url: `comments/${filmId}`,
      method: request.POST,
      body: JSON.stringify(FilmsModel.commentServerAdapter(comments)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then((response) => ({
        film: FilmsModel.userAdapter(response.movie),
        comments: response.comments.map(FilmsModel.commentUserAdapter),
      }));
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: request.DELETE,
    });
  }

  sync(data) {   //
    return this._load({
      url: 'movies/sync',
      method: request.POST,
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(Api.toJSON);
  }

  _load({
    url,
    method = request.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);
    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (response.status.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}

export const api = new Api(END_POINT, AUTHORIZATION);
