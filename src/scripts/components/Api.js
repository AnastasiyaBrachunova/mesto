export default class Api {
  constructor(config) {
    this.headers = config.headers;
    this.url = config.url;
  }

  _fetch(url, opt = {}) {
    return fetch(this.url + url, { headers: this.headers, ...opt })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) =>
        console.log("Ошибка" , err));
    }

    setInitialCard(name, link) {
      return this._fetch(`/cards`, {
        method: `POST`,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then((res) => {
        if (res.ok) {
          return Promise.resolve(res.json());
        }
      })
    }
    
getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

    getInitialCards() {
      return this._fetch(`/cards`);
    }

  setInitialCard(name, link) {
    return this._fetch(`/cards`, {
      method: `POST`,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getInitialCards() {
    return this._fetch(`/cards`);
  }

  getUserInfo() {
    return this._fetch(`/users/me`);
  }

  setUserInfo(name, about) {
    return this._fetch(`/users/me`, {
      method: `PATCH`,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  setUserAvatar(avatar) {
    return this._fetch(`/users/me/avatar`, {
      method: `PATCH`,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  delInitialCards(del) {
    return this._fetch(`/cards/${del}`, {
      method: `DELETE`,
      body: JSON.stringify({
        _id: del,
      }),
    });
  }

  addLikeCard(addlike) {
    return this._fetch(`/cards/likes/${addlike}`, {
      method: `PUT`,
      body: JSON.stringify({
        _id: addlike,
      }),
    });
  }

  remLikeCard(remlike) {
    return this._fetch(`/cards/likes/${remlike}`, {
      method: `DELETE`,
      body: JSON.stringify({
        _id: remlike,
      }),
    });
  }
}
