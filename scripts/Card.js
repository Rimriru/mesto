export {Card};

class Card {
  constructor(cardInfo, templateSelector, openPopupHandler) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._templateSelector = templateSelector;
    this._openPopupHandler = openPopupHandler;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _likeCardHandler(evt) {
    evt.currentTarget.classList.toggle('element__like-button_active');
  }

  _removeCardHandler(evt) {
    evt.currentTarget.closest('.element').remove();
  }

  _setEventListeners() {
    this._imageCard.addEventListener('click', () => {
      this._openPopupHandler();
    });
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._likeCardHandler(evt);
    })
    this._element.querySelector('.element__remove-button').addEventListener('click', (evt) => {
      this._removeCardHandler(evt);
    });
  }

  createCard() {
    this._element = this._getTemplate();
    
    this._element.querySelector('.element__name').textContent = this._name;
    this._imageCard = this._element.querySelector('.element__image');
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
