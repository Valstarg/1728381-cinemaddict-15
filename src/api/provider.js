import FilmsModel from '../model/mod-films.js';

function isOnline() {
  return window.navigator.onLine;
}

const getSyncedMovies = (items) =>
  items.filter(({ success }) => success).map(({ payload }) => payload.movie);
const createStoreStructure = (items) =>
  items.reduce(
    (acc, current) =>
      Object.assign({}, acc, {
        [current.id]: current,
      }),
    {},
  );

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    if (isOnline()) {
      return this._api.getMovies().then((movies) => {
        const items = createStoreStructure(
          movies.map(FilmsModel.adaptToServer),
        );
        this._store.setItems(items);
        return movies;
      });
    }
    const storeMovies = Object.values(this._store.getItems());
    return Promise.resolve(storeMovies.map(FilmsModel.adaptToClient));
  }

  updateMovie(movie) {
    if (isOnline()) {
      return this._api.updateMovie(movie).then((updatedMovie) => {
        this._store.setItem(
          updatedMovie.id,
          FilmsModel.adaptToServer(updatedMovie),
        );
        return updatedMovie;
      });
    }
    this._store.setItem(
      movie.id,
      FilmsModel.adaptToServer(Object.assign({}, movie)),
    );
    return Promise.resolve(movie);
  }

  getComments(movie) {
    if (isOnline()) {
      return this._api.getComments(movie).then((comments) => {
        const items = createStoreStructure(comments);
        this._store.setItems(items);
        return comments;
      });
    }
    const storeComments = Object.values(this._store.getItems());
    return Promise.resolve(storeComments);
  }

  addComment(commentData) {
    if (isOnline()) {
      return this._api.addComment(commentData).then((newComment) => {
        this._store.setItem(newComment);
        return newComment;
      });
    }
    return Promise.reject(new Error('Add comment failed'));
  }

  deleteComment(commentId) {
    if (isOnline()) {
      return this._api
        .deleteComment(commentId)
        .then(() => this._store.removeItem(commentId));
    }
    return Promise.reject(new Error('Delete comment failed'));
  }

  sync() {
    if (isOnline()) {
      const storeMovies = Object.values(this._store.getItems());
      return this._api.sync(storeMovies).then((response) => {
        const updatedMovies = getSyncedMovies(response.updated);
        const items = createStoreStructure([...updatedMovies]);
        this._store.setItems(items);
      });
    }
    return Promise.reject(new Error('Sync data failed'));
  }
}
