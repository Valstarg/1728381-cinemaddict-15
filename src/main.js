// Точка входа.

// Импорты.

import MoviesInsideView from './view/movies-inside.js';
import FilmsPresenter from './presenter/films-list.js';
import FiltersPresenter from './presenter/filters.js';
import FilmsModel from './model/mod-films.js';
import FiltersModel from './model/mod-filters.js';
import {api} from './api/api.js';
import {render, renderPosition} from './utils/render.js';
import {updateType} from './utils/util.js';
//import Store from './api/store.js';
//import Provider from './api/provider.js';
//import {toast, removeToast} from './utils/toasts.js';

// Переменные разметки.

// Работа оффлайн.

//const STORE_PREFIX = 'cinemaddict-localstorage';
//const STORE_VER = 'v15';
//const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
//const store = new Store(STORE_NAME, window.localStorage);
//const apiWithProvider = new Provider(api, store);
/*function getMainNavigationAdditional() {
  return document.querySelector('.main-navigation__additional');
}*/

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStat = document.querySelector('.footer__statistics');

// Отрисовка элементов.

const filmsModel = new FilmsModel();
const filtersModel = new FiltersModel();
const filtersPresenter = new FiltersPresenter(main, header, filmsModel, filtersModel);
const filmsPresenter = new FilmsPresenter(main, filmsModel, filtersModel);

filmsPresenter.init();
api.getFilms()
  .then((films) => {
    filmsModel.setFilms(updateType.INIT, films);
    filtersPresenter.init();
    render(footerStat, new MoviesInsideView(films), renderPosition.BEFOREEND);
  })
  .catch(() => {
    filmsModel.setFilms(updateType.INIT, []);
  });
