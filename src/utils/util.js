// Утилитарные функции и переменные.


// Импорты.

import dayjs from 'dayjs';

// Магические числа.

const TEXT_MAX = 200;
//const BAR_HEIGHT = 50;

// Переменные.

export const typeSort = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const filterType = {
  ALL: 'all',
  FAVORITES: 'favorites',
  HISTORY: 'history',
  WATCHLIST: 'watchlist',
  STATS: 'stats',
};

export const updateType = {
  PATCH: 'PATCH',
  MAJOR: 'MAJOR',
  STATS: 'STATS',
};

export const filter = {
  [filterType.ALL]: (films) => films,
  [filterType.HISTORY]: (films) => films.filter((film) => film.userDetails.history),
  [filterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
  [filterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
};

export const StatsFilterType = {
  ALL: 'all-time',
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  TODAY: 'today',
};

// Функция выбора случайного числа.

export function getRandomNumber(from, before) {
  return Math.floor(Math.random() * (before - from + 1) + from);
}

// Функция выбора первого элемента массива.

export function getFirstArrayElement(array) {
  return array[0];
}

// Функция выбора класса элемента в разметке.

export const getCardClass = (variable) => variable ? 'film-card__controls-item film-card__controls-item--active' : 'film-card__controls-item';
export const getPopupClass = (variable) => variable ? 'film-details__control-button film-details__control-button--active' : 'film-details__control-button';

// Функция обрезки текста.

export function getSliceText(text) {
  let someText = text.slice(0, TEXT_MAX);
  if (text.length > someText.length) {
    someText += '...';
  }
  return someText;
}

//

export function isWatchingDate(date, sortType) {
  switch (sortType) {
    case StatsFilterType.ALL:
      return date;
    case StatsFilterType.YEAR:
      return date = date.filter((film) => dayjs(film.userDetails.watchingDate).diff() > -31536000000);
    case StatsFilterType.MONTH:
      return date = date.filter((film) => dayjs(film.userDetails.watchingDate).diff() > -2592000000);
    case StatsFilterType.WEEK:
      return date = date.filter((film) => dayjs(film.userDetails.watchingDate).diff() > -604800000);
    case StatsFilterType.TODAY:
      return date = date.filter((film) => dayjs(film.userDetails.watchingDate).diff() > -86400000);
  }
}

//

export function getSumRuntime(data) {
  const runtime = [];
  data.forEach((film) => {
    runtime.push(film.filmInfo.runtime);
  });
  const sum = runtime.reduce((a, b) => a + b, 0);
  return sum;
}

//

export function getGenres(films) {
  const genres = new Set();
  films.forEach((film) => film.filmInfo.genres.forEach((genre) => genres.add(genre)));
  return genres;
}

//

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
