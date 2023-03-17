export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleOverlayClick(evt) {
    if(evt.currentTarget === evt.target) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if(evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const buttonClosePopup = this._popup.querySelector('popup__close-button');

    buttonClosePopup.setEventListener('click', () => {
      this.close();
    });
    this._popup.setEventListener('click', (evt) => {
      this._handleOverlayClick(evt);
    });
    document.setEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });

  }
}