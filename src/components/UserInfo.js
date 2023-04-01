export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
    this._avatarSelector = avatarSelector;
    this._name = document.querySelector(this._nameSelector);
    this._description = document.querySelector(this._descriptionSelector);
    this._avatar = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    return {name: this._name.textContent, about: this._description.textContent};
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._description.textContent = about;
  }

  setUserAvatar(link) {
    this._avatar.src = link;
  }

  setUserId(userId) {
    this._userId = userId;
  }

  getUserId() {
    return this._userId;
  }
}