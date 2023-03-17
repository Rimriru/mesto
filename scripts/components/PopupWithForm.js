import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormHandler) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._inputs = this._popup.querySelector('popup__form').elements;
  }

  // _getInputValues() {
  //   const inputValues = [];
  //   this._inputs.forEach(input => {
  //     input
  //   });
  // }
}