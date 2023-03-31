export default class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
    this._name = document.querySelector(this._nameSelector);
    this._description = document.querySelector(this._descriptionSelector);
  }

  getUserInfo() {
    return {name: this._name.textContent, about: this._description.textContent};
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._description.textContent = about;
  }

  setUserId(userId) {
    this._userId = userId;
  }

  getUserId() {
    return this._userId;
  }
}