// Статистика сайта.

// Импорты.

import AbstractView from './abstraction.js';

// Отрисовка статистики. Добавляем данные.

function createStatTemplate(parameter) {
  return (`<p>${parameter.length} movies inside</p>`);
}

// Создание класса. Абстракция и наследование.

export default class StatComponent extends AbstractView {
  constructor(parameter) {
    super();
    this._parameter = parameter;
  }

  getTemplate() {
    return createStatTemplate(this._parameter);
  }
}
