import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupElement = this._popup.querySelector('.popup__image');
    this._imageCaptionPopupElement = this._popup.querySelector('.popup__image-caption');
  }

  open({name, link}) {
    super.open();
    this._imagePopupElement.src = link;
    this._imagePopupElement.alt = name;
    this._imageCaptionPopupElement.textContent = name;
  }
}