import Popup from './Popup';

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupElement = this._popup.querySelector('.popup__image');
    this._imageCaptionPopupElement = this._popup.querySelector('.popup__image-caption');
  }

  open() {
    super.open();
    this._imagePopupElement.src = this._link;
    this._imagePopupElement.alt = this._name;
    this._imageCaptionPopupElement.textContent = this._name;
  }
}