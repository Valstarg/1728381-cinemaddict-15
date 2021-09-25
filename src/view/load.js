// Ожидание.

// Импорты.

import AbstractView from './abstraction.js';

//  Шаблон.

function createLoadTemplate() {
  return `<section class="films">
            <section class="films-list">
              <h2 class="films-list__title">Loading...</h2>
            </section>
          </section>`;
}

// Создание класса.

export default class LoadComponent extends AbstractView {
  getTemplate() {
    return createLoadTemplate();
  }
}
