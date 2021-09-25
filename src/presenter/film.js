// Презентер карточки фильма.

// Импорты.

import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import {render, renderPosition, replace, remove} from '../utils/render.js';
import {updateType, userAction} from '../utils/util.js';
import {api} from '../api';

//  Создание класса.

export default class FilmComponent {
  constructor(filmContainer, changeData, typeFilter) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._typeFilter = typeFilter;
    this._cardComponent = null;
    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleCloseEscClick = this._handleCloseEscClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleAddClick = this._handleAddClick.bind(this);
    this._resetForm = this._resetForm.bind(this);
  }

  init(card, comments = []) {
    this._card = card;
    this._comments = comments;
    const prevCardComponent = this._cardComponent;
    this._cardComponent = new FilmCardView(card);
    if (this._cardPopupComponent) {
      if (document.querySelector('.film-details')) {
        document.querySelector('.film-details').remove();
      }
      this._renderPopup(this._comments, this._cardPopupComponent.getScroll());
    }
    this._cardComponent.setOpenClickHandler(this._handleOpenClick);
    this._cardComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._cardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    if (prevCardComponent === null) {
      render(this._filmContainer, this._cardComponent, renderPosition.BEFOREEND);
      return;
    }
    if (this._filmContainer.contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }
    remove(prevCardComponent);
  }

  _resetForm() {
    this._cardPopupComponent.updateData({
      isDisable: false,
      isDelete: false,
    });
  }

  destroy() {
    remove(this._cardComponent);
    if (document.querySelector('.film-details')) {
      this._handleClosePopupClick();
    }
    document.body.classList.remove('hide-overflow');
  }

  _renderPopup(comments = [], scroll) {
    if (this._cardPopupComponent) {
      remove(this._cardPopupComponent);
    }
    document.removeEventListener('keydown', this._handleCloseEscClick);
    this._cardPopupComponent = new PopupView(this._card, comments);
    this._cardPopupComponent.setCloseClickHandler(this._handleCloseClick);
    this._cardPopupComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._cardPopupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._cardPopupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._cardPopupComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._cardPopupComponent.setAddClickHandler(this._handleAddClick);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._handleCloseEscClick);
    render(document.body, this._cardPopupComponent, renderPosition.BEFOREEND);
    this._cardPopupComponent.getElement().scrollTop = scroll;
  }

  _handleHistoryClick() {
    const currentFilterType = this._typeFilter === 'all' || this._typeFilter !== 'history';
    if (!currentFilterType && this._cardPopupComponent) {
      this._handleClosePopupClick();
    }
    this._changeData(
      userAction.UPDATE_FILM,
      currentFilterType ? updateType.PATCH : updateType.MINOR,
      {
        ...this._card,
        userDetails: {
          ...this._card.userDetails,
          history: !this._card.userDetails.history,
        },
      });
  }

  _handleFavoriteClick() {
    const currentFilterType = this._typeFilter === 'all' || this._typeFilter !== 'favorites';
    this._changeData(
      userAction.UPDATE_FILM,
      currentFilterType ? updateType.PATCH : updateType.MINOR,
      {
        ...this._card,
        userDetails: {
          ...this._card.userDetails,
          favorite: !this._card.userDetails.favorite,
        },
      });
  }

  _handleWatchlistClick() {
    const currentFilterType = this._typeFilter === 'all' || this._typeFilter !== 'watchlist';
    this._changeData(
      userAction.UPDATE_FILM,
      currentFilterType ? updateType.PATCH : updateType.MINOR,
      {
        ...this._card,
        userDetails: {
          ...this._card.userDetails,
          watchlist: !this._card.userDetails.watchlist,
        },
      });
  }

  _handleDeleteClick(commentId, filmId) {
    this._cardPopupComponent.updateData({isDisable: true, isDelete: true});

    api.deleteComment(commentId).then(() => {
      this._changeData(
        userAction.DELETE_COMMENT,
        updateType.PATCH,
        { commentId, filmId },
      );
    }).catch(() => {
      this._cardPopupComponent.updateData({isDisable: false, isDelete: false});
      this._cardPopupComponent.shake(this._resetForm);
    });
  }

  _handleAddClick(card, newComment) {
    this._cardPopupComponent.updateData({isDisable: true, emojiName: null});

    api.addComment(card.id, newComment).then((response) => {
      this._changeData(
        userAction.ADD_COMMENT,
        updateType.PATCH,
        response ,
      );
    }).catch(() => {
      this._cardPopupComponent.updateData({isDisable: false});
      this._cardPopupComponent.shake(this._resetForm);
    });
  }

  _handleOpenClick() {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    this._renderPopup();
    this._changeData(
      userAction.LOAD_COMMENTS,
      updateType.PATCH,
      { film: this._card },
    );
  }

  _handleCloseClick() {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._handleCloseEscClick);
  }

  _handleCloseEscClick(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this._handleCloseClick();
    }
  }
}
