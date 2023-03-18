export default class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
    this._name = document.querySelector(this._nameSelector);
    this._description = document.querySelector(this._descriptionSelector);
  }

  getUserInfo() {
    return {name: this._name.textContent, description: this._description.textContent};
  }

  setUserInfo({name, description}) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}