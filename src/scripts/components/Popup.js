export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._buttonClosePopup = this._popup.querySelector('.popup__close-button');

    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // this._removeEventListeners();
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
    this._buttonClosePopup.addEventListener('click', this.close);
    this._popup.addEventListener('click', this._handleOverlayClick);
    document.addEventListener('keydown', this._handleEscClose);
  }

  // _removeEventListeners() {
  //   this._buttonClosePopup.removeEventListener('click', this.close);
  //   this._popup.removeEventListener('click', this._handleOverlayClick);
  //   document.removeEventListener('keydown', this._handleEscClose);
  // }
}


