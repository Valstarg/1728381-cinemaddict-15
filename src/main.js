// Точка входа.

// Импорты.

import MoviesInsideView from './view/movies-inside.js';
import FilmsPresenter from './presenter/films-list.js';
import FiltersPresenter from './presenter/filters.js';
import FilmsModel from './model/mod-films.js';
import FiltersModel from './model/mod-filters.js';
import {api} from './api.js';
import {render, renderPosition} from './utils/render.js';
import {updateType} from './utils/util.js';

// Переменные разметки.

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
