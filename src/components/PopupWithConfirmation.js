import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__submit-button');
  }

  setConfirmHandler(confirmHandler) {
    this._confirmHandler = confirmHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._confirmHandler();
    });
  }
}