export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getUserInfo() {
    try {
      const res = await fetch(`${this._baseUrl}/v1/cohort-63/users/me`, {
        headers: this._headers
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(`Ой! Не удалось получить данные профиля! Ошибка: ${err}`);
    }
    
  }

  async getInitialCards() {
    try {
      const res = await fetch(`${this._baseUrl}/v1/cohort-63/cards`, {
        headers: this._headers
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(`Ой! Карточки не получены! Ошибка: ${err}`);
    }
  }

  async editUserInfo({ name, about }) {
    try {
      const res = await fetch(`${this._baseUrl}/v1/cohort-63/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ name, about })
      });
      const data = res.json();
      return data;
    } catch (err) {
      console.log(`Ой! Не удалось изменить данные профиля! Ошибка: ${err}`);
    }
  }

  async addNewCard({ name, link }) {
    try {
      const res = await fetch(`${this._baseUrl}/v1/cohort-63/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name, link })
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(`Ой! Не удалось добавить новую карточку! Ошибка: ${err}`);
    }
  }

  async removeCard(cardId) {
    try {
      const res = await fetch(`${this._baseUrl}/v1/cohort-63/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(`Ой! Не удалось удалить карточку! Ошибка: ${err}`);
    }
  }

  // async addLikeCard(userObj) {
  //   try {
  //     const res = await fetch(`${this._baseUrl}/v1/cohort-63/cards/likes`, {
  //       method: 'PUT',
  //       headers: this._headers,
  //       body: JSON.stringify(userObj)
  //     });
  //     const data = await res.json();
  //     return data;
  //   } catch (err) {
  //     console.log(`Ой! Не удалось добавить лайк на карточку! Ошибка: ${err}`);
  //   }
  // }

  // async removeLikeCard() {
  //   try {
  //     const res = await fetch(`${this._baseUrl}/v1/cohort-63/cards/likes`, {
  //       method: 'DELETE',
  //       headers: this._headers,
  //       body: 
  //     });
  //   } catch (err) {
  //     console.log(`Ой! Не удалось убрать лайк с карточки! Ошибка: ${err}`);
  //   }
  //   }
  // }
}