import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFormHandler}) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._form = document.querySelector(this._popupSelector).querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__person'));

    this._submitFormHandler = this._submitFormHandler.bind(this);
  }

  open(parameter) {
    super.open();
    if(parameter !== undefined) {
      const { name, description } = parameter;
      if(this._popupSelector === '.popup_type_profile') {
        this._form.querySelector('#name').value = name;
        this._form.querySelector('#description').value = description;
      }
    }
  }

  _getInputValues() {
    let inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._removeEventListeners();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitFormHandler);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitFormHandler)
  }
}