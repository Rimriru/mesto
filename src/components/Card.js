export default class Card {
  constructor(
    {name, link, _id, owner, likes}, 
    templateSelector, 
    handleCardClick, 
    handleRemoveBtnClick, 
    likeCardHandler,
    removeLikeCardHandler, 
    userId) {
    this._name = name;
    this._link = link;
    this._cardId = _id;
    this._ownerId = owner._id;
    this._likes = likes;
    this._userId = userId;
    this._handleRemoveBtnClick = handleRemoveBtnClick;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likeCardHandler = likeCardHandler;
    this._removeLikeCardHandler = removeLikeCardHandler;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._imageCard.addEventListener('click', () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      if(!evt.currentTarget.classList.contains('element__like-button_active')) {
        this._likeCardHandler(this);
        evt.currentTarget.classList.add('element__like-button_active');
      } else {
        this._removeLikeCardHandler(this);
        evt.currentTarget.classList.remove('element__like-button_active');
      }
    });
    this._element.querySelector('.element__remove-button').addEventListener('click', () => {
      this._handleRemoveBtnClick(this);
    });
  }

  updateLikesCounter(likes) {
    this._element.querySelector('.element__likes-counter').textContent = likes.length;
  }

  _isLikedByUser() {
    const isLiked = this._likes.some(like => {
      return like._id === this._userId;
    })

    if(isLiked) {
      this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
    }
  }

  createCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__name').textContent = this._name;
    this._imageCard = this._element.querySelector('.element__image');
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._element.querySelector('.element__likes-counter').textContent = this._likes.length;
    this._isLikedByUser();

    this._setEventListeners();

    if(this._ownerId !== this._userId) {
      this._element.querySelector('.element__remove-button').remove();
    }

    return this._element;
  }
}


