export default class Card {
  constructor({name, link, _id, owner, likes}, templateSelector, handleCardClick, handleRemoveBtnClick, userId) {
    this._name = name;
    this._link = link;
    this._cardId = _id;
    // this._likeCardHandler = likeCardHandler;
    this._ownerId = owner._id;
    this._likes = likes;
    this._userId = userId;
    this._handleRemoveBtnClick = handleRemoveBtnClick;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _likeCardHandler(evt) {
    evt.currentTarget.classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    this._imageCard.addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      // evt.currentTarget.classList.toggle('element__like-button_active');
      this._likeCardHandler(evt);
    });
    this._element.querySelector('.element__remove-button').addEventListener('click', () => {
      this._handleRemoveBtnClick(this._cardId, this._element);
    });
  }

  createCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__name').textContent = this._name;
    this._imageCard = this._element.querySelector('.element__image');
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._element.querySelector('.element__likes-counter').textContent = this._likes.length;

    this._setEventListeners();

    if(this._ownerId !== this._userId) {
      this._element.querySelector('.element__remove-button').remove();
    }

    return this._element;
  }
}


