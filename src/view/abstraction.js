// Абстракция.

// Имрорты.

import {createTemplate} from '../utils/util.js';

// Создание класса.

export default class Abstraction {
  constructor() {
    if (new.target === Abstraction) {
      throw new Error('Can not instantiate abstraction, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstraction method not implemented: getTemplate');
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
