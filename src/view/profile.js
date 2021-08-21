// Аватар профиля пользователя.

// Импорты.

import {createTemplate} from '../utils/util.js';

// Отрисовка аватара.

function createProfileTemplate() {
  return (`<section class="header__profile profile">
             <p class="profile__rating">Movie Buff</p>
             <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
           </section>`);
}

// Создание класса.

export default class profile {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createTemplate(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
