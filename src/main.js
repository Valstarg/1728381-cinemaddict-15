// Точка входа.

// Импорты.

import {createProfileTemplate} from './view/profile.js';
import {createNavigationTemplate} from './view/navigation.js';
import {createSortTemplate} from './view/sort.js';
import {createFilmListTemplate} from './view/films.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmListExtraTemplate} from './view/films-extra.js';
import {createShowMoreTemplate} from './view/show-more-button.js';
import {createStatTemplate} from './view/stat.js';
import {createPopupTemplate} from './view/popup.js';
import {filmData} from './mock/film-data.js';

// Магические числа.

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;
const FILMS_COUNT_STEP = 5;

// Функция отрисовки элементов.

function render(container, template, place) {
  return container.insertAdjacentHTML(place, template);
}

// Переменные разметки и отрисовка элементов.

const header = document.querySelector('.header');
const main = document.querySelector('.main');
render(header, createProfileTemplate(), 'beforeend');
render(main, createNavigationTemplate(filmData), 'beforeend');

// Кнопки навигации.

const navigationItem = document.querySelectorAll('.main-navigation__item');
navigationItem.forEach((link) => {
  link.addEventListener('click', () => {
    navigationItem.forEach(((button) => {
      button.classList.remove('main-navigation__item--active');
    }));
    link.classList.add('main-navigation__item--active');
  });
});
render(main, createSortTemplate(), 'beforeend');
render(main, createFilmListTemplate(), 'beforeend');

// Отрисовка карточек фильмов.

const filmsListContainer = document.querySelector('.films-list__container');
for (let i = 0; i < Math.min(filmData.length, FILMS_COUNT); i++) {
  render(filmsListContainer, createFilmCardTemplate(filmData[i]), 'beforeend');
}

// ShowMore. Отрисовка новых карточек фильмов.

const filmsList = document.querySelector('.films-list');
if (filmData.length > FILMS_COUNT_STEP) {
  let renderedCount = FILMS_COUNT_STEP;
  render(filmsList, createShowMoreTemplate(), 'beforeend');
  const showMoreButton = document.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    filmData.slice(renderedCount, renderedCount + FILMS_COUNT_STEP)
      .forEach((card) => {
        render(filmsListContainer, createFilmCardTemplate(card), 'beforeend');
      });
    renderedCount += FILMS_COUNT_STEP;
    if (renderedCount >= filmData.length) {
      showMoreButton.remove();
    }
  });
}

// Блок экстра.

const titleExtra = [{ title: 'Top rated' }, { title: 'Most commented' }];
const films = document.querySelector('.films');
for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(films, createFilmListExtraTemplate(titleExtra[i]), 'beforeend');
}
const filmsExtra = document.querySelector('.films');
const filmsListExtra = filmsExtra.querySelectorAll('.films-list--extra');
const ratedFilms = filmData
  .sort((a, b) => (b.filmInfo.totalRating > a.filmInfo.totalRating) ? 1 : -1)
  .slice(0, 2);
ratedFilms.forEach((card) => {
  const ratedFilmsListContainer = filmsListExtra[0].querySelector('.films-list__container');
  render(ratedFilmsListContainer, createFilmCardTemplate(card), 'beforeend');
});
const mostComments = filmData
  .slice()
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, 2);
mostComments.forEach((card) => {
  const mostCommentsFilmListContainer = filmsListExtra[1].querySelector('.films-list__container');
  render(mostCommentsFilmListContainer, createFilmCardTemplate(card), 'beforeend');
});

// Вызов попап окна.

const footer = document.querySelector('.footer');
const commentsElement = document.querySelectorAll('.film-card__comments');
commentsElement.forEach((link, i) => {
  link.addEventListener('click', () => {
    render(footer, createPopupTemplate(filmData[i]), 'afterend');
    const popupCloseButton = document.querySelector('.film-details__close-btn');
    const popupFilmDetails = document.querySelector('.film-details');
    popupCloseButton.addEventListener('click', () => {
      popupFilmDetails.remove();
    });
  });
});

// Статистика сайта.

const footerStat = document.querySelector('.footer__statistics');
render(footerStat, createStatTemplate(filmData), 'beforeend');
