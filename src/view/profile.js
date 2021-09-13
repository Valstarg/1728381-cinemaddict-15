// Аватар профиля пользователя.

// Импорты.

import AbstractionView from './abstraction.js';

// Отрисовка аватара.

function createProfileTemplate() {
  return (`<section class="header__profile profile">
             <p class="profile__rating">Movie Buff</p>
             <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
           </section>`);
}

// Создание класса. Абстракция и наследование.

export default class ProfileTemplate extends AbstractionView {
  getTemplate() {
    return createProfileTemplate();
  }
}
