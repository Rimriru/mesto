import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFormHandler}) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._form = document.querySelector(this._popupSelector).querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__person'));

    this._submitFormHandler = this._submitFormHandler.bind(this);
  }

  open({name, description}) {
    super.open();
    if(this._popupSelector === '.popup_type_profile') {
      this._form.querySelector('#name').value = name;
      this._form.querySelector('#description').value = description;
    }
  }

  _getInputValues() {
    let inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    console.log(inputValues);
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