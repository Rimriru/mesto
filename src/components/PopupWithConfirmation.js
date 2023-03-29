import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, {confirmHandler}) {
    super(popupSelector);
    this._confirmHandler = confirmHandler;
    this._confirmButton = this._popup.querySelector('.popup__submit-button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._confirmHandler();
    });
  }
}