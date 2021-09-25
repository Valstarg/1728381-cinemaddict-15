// Аватар профиля пользователя.

// Импорты.

import AbstractView from './abstraction.js';
import {getRank} from '../utils/util.js';

// Отрисовка аватара.

function createProfileTemplate(rank) {
  return `<section class="header__profile profile">
            <p class="profile__rating">${getRank(rank)}</p>
            <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          </section>`;
}

// Создание класса.

export default class ProfileComponent extends AbstractView {
  constructor(rank) {
    super();
    this._rank = rank;
  }

  getTemplate() {
    return createProfileTemplate(this._rank);
  }
}
