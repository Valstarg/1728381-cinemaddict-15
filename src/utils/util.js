// Утилитарные функции и переменные.

// Импорты.

import dayjs from 'dayjs';

// Магические числа.

const TEXT_MAX = 200;
const FILMS_NONE = 0;
const FILMS_MIN = 10;
const FILMS_MAX = 20;

// Переменные.

export const sortTypes = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const filterTypes = {
  ALL: 'all',
  FAVORITES: 'favorites',
  HISTORY: 'history',
  WATCHLIST: 'watchlist',
  STATS: 'stats',
};

export const userAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  LOAD_COMMENTS: 'LOAD_COMMENTS',
};

export const updateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  STATS: 'STATS',
  INIT: 'INIT',
};

export const filter = {
  [filterTypes.ALL]: (films) => films,
  [filterTypes.HISTORY]: (films) => films.filter((film) => film.userDetails.history),
  [filterTypes.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
  [filterTypes.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
};

export const statFilterTypes = {
  ALL: 'all-time',
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  TODAY: 'today',
};

const ranks = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

// Функция выбора первого элемента массива.

export function getFirstArrayElement(array) {
  return array[0];
}

// Функция выбора класса элемента в разметке.

export const getCardClass = (variable) => variable ? 'film-card__controls-item film-card__controls-item--active' : 'film-card__controls-item';
export const getPopupClass = (variable) => variable ? 'film-details__control-button film-details__control-button--active' : 'film-details__control-button';
export const getSliceText = (text) => text.length > TEXT_MAX ? `${text.slice(0, TEXT_MAX)}...` : text;

//  Статистика просмотров.

export function isDate(date, sortType) {
  switch (sortType) {
    case statFilterTypes.ALL:
      return date;
    case statFilterTypes.YEAR:
      return date = date.filter((film) => dayjs(film.userDetails.watchingDate).diff() > -31536000000);
    case statFilterTypes.MONTH:
      return date = date.filter((film) => dayjs(film.userDetails.watchingDate).diff() > -2592000000);
    case statFilterTypes.WEEK:
      return date = date.filter((film) => dayjs(film.userDetails.watchingDate).diff() > -604800000);
    case statFilterTypes.TODAY:
      return date = date.filter((film) => dayjs(film.userDetails.watchingDate).diff() > -86400000);
  }
}

//  Продолжителльность.

export function getRuntime(data) {
  const runtime = [];
  data.forEach((film) => {
    runtime.push(film.filmInfo.runtime);
  });
  const sum = runtime.reduce((a, b) => a + b, 0);
  return sum;
}

//  Жанр фильма.

export function getGenres(films) {
  const genres = new Set();
  films.forEach((film) => film.filmInfo.genres.forEach((genre) => genres.add(genre)));
  return genres;
}

export function getDataGenres(films, count) {
  const allMoviesGenres = [];
  films.forEach((film) => allMoviesGenres.push(...film.filmInfo.genres));
  const dataGenres = [];
  getGenres(films).forEach((genre) =>
    dataGenres.push({
      genre: genre,
      count: allMoviesGenres.filter((allMoviesgenre) => allMoviesgenre === genre).length,
    }),
  );
  const newGenres = dataGenres.sort((a, b) => (b.count > a.count) ? 1 : -1);
  const counts = [];
  const genres = [];
  newGenres.forEach((i) => {
    counts.push(i.count);
    genres.push(i.genre);
  });
  if (count) {
    return counts;
  }
  return genres;
}

//  Инфо о пользователе.

export function getRank(watchedCount) {
  const isNoviceRank = watchedCount > FILMS_NONE && watchedCount <= FILMS_MIN;
  const isFanRank = watchedCount > FILMS_MIN && watchedCount <= FILMS_MAX;
  const isMovieBuffRank = watchedCount > FILMS_MAX;
  if (isNoviceRank) {
    return ranks.NOVICE;
  } else if (isFanRank) {
    return ranks.FAN;
  } else if (isMovieBuffRank) {
    return ranks.MOVIE_BUFF;
  } else {
    return '';
  }
}
