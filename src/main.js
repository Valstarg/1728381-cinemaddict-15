// Точка входа.

// Импорты.

import profileView from './view/profile.js';
import navigationView from './view/navigation.js';
import sortView from './view/sort.js';
import filmListView from './view/films.js';
import filmCardView from './view/film-card.js';
import filmListExtraView from './view/films-extra.js';
import showMoreView from './view/show-more-button.js';
import statView from './view/stat.js';
import popupView from './view/popup.js';
import filmNoCardView from './view/no-films.js';
import {filmData} from './mock/film-data.js';

// Магические числа.

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;
const FILMS_COUNT_STEP = 5;

// Переменные разметки.

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

// Отрисовка элементов.

header.appendChild(new profileView().getElement());
main.appendChild(new sortView().getElement());

// Навигация.

const mainFilters = {
  Favorites: 'favorite',
  History: 'history',
  Watchlist: 'watchlist',
};

function generateFilter(item) {
  return Object.entries(mainFilters).map(([filterName, count]) => ({
    name: filterName,
    count: item.filter((task) => task.userDetails[count]).length,
  }),
  );
}

const filters = generateFilter(filmData);
main.appendChild(new navigationView(filters).getElement());

// Окно попап(открытие, закрытие, клавиша ESC).

function renderFilmCard(container, data) {
  const filmComponent = new filmCardView(data);
  const popupComponent = new popupView(data);

  function pressEsc(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      document.querySelector('.film-details').remove();
      document.removeEventListener('keydown', pressEsc);
      document.querySelector('body').classList.remove('hide-overflow');
    }
  }

  function openPopup() {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    footer.appendChild(popupComponent.getElement());
    document.querySelector('body').classList.add('hide-overflow');
    document.addEventListener('keydown', pressEsc);
  }

  const film = filmComponent.getElement();

  film.querySelector('.film-card__poster').addEventListener('click', () => {
    openPopup();
  });

  film.querySelector('.film-card__comments').addEventListener('click', () => {
    openPopup();
  });

  film.querySelector('.film-card__title').addEventListener('click', () => {
    openPopup();
  });

  popupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    document.querySelector('.film-details').remove();
    document.removeEventListener('keydown', pressEsc);
    document.querySelector('body').classList.remove('hide-overflow');
  });

  container.appendChild(filmComponent.getElement());
}

// Карточки фильфов и раздел экстра.

const renderFilmsList = (listContainer, data) => {
  listContainer.appendChild(new filmListView().getElement());
  const films = document.querySelector('.films');
  const filmsList = document.querySelector('.films-list');
  const filmsListContainer = document.querySelector('.films-list__container');

  if (data.length === 0) {
    filmsList.appendChild(new filmNoCardView().getElement());
    return;
  }

  for (let i = 0; i < Math.min(data.length, FILMS_COUNT); i++) {
    renderFilmCard(filmsListContainer, data[i]);
  }

  const titleExtra = [{ title: 'Top rated' }, { title: 'Most commented' }];
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    films.appendChild(new filmListExtraView(titleExtra[i]).getElement());
  }

  const filmsListExtra = document.querySelectorAll('.films-list--extra');
  const ratedFilms = data
    .sort((a, b) => (b.filmInfo.totalRating > a.filmInfo.totalRating) ? 1 : -1)
    .slice(0, EXTRA_FILMS_COUNT);
  ratedFilms.forEach((card) => {
    const ratedFilmsListContainer = filmsListExtra[0].querySelector('.films-list__container');
    renderFilmCard(ratedFilmsListContainer, card);
  });

  const mostComments = data
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, EXTRA_FILMS_COUNT);
  mostComments.forEach((card) => {
    const mostCommentsFilmListContainer = filmsListExtra[1].querySelector('.films-list__container');
    renderFilmCard(mostCommentsFilmListContainer, card);
  });

  if (data.length > FILMS_COUNT_STEP) {
    let renderCount = FILMS_COUNT_STEP;
    filmsList.appendChild(new showMoreView().getElement());
    const showMoreButton = document.querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      data.slice(renderCount, renderCount + FILMS_COUNT_STEP)
        .forEach((card) => {
          renderFilmCard(filmsListContainer, card);
        });
      renderCount += FILMS_COUNT_STEP;

      if (renderCount >= filmData.length) {
        showMoreButton.remove();
      }
    });
  }
};

renderFilmsList(main, filmData);

// Статистика сайта.

const footerStat = document.querySelector('.footer__statistics');
footerStat.appendChild(new statView(filmData).getElement());
