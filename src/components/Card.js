export default class Card {
  constructor(
    { name, link, _id, owner, likes }, 
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

    this._element = this._getTemplate();
    this._removeBtn = this._element.querySelector('.element__remove-button');
    this._likesCounter = this._element.querySelector('.element__likes-counter');
    this._likeBtn = this._element.querySelector('.element__like-button');

    this.likeBtnActive = 'element__like-button_active';
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._imageCard.addEventListener('click', () => {
      this._handleCardClick( {name: this._name, link: this._link} );
    });
    this._likeBtn.addEventListener('click', (evt) => {
      return evt.currentTarget.classList.contains(this.likeBtnActive) ?
        this._removeLikeCardHandler(evt, this) : this._likeCardHandler(evt, this)
    });
    this._removeBtn.addEventListener('click', () => {
      this._handleRemoveBtnClick(this);
    });
  }

  updateLikesCounter(likes) {
    this._likesCounter.textContent = likes.length;
  }

  _isLikedByUser() {
    const isLiked = this._likes.some(like => {
      return like._id === this._userId;
    })

    if(isLiked) {
      this._likeBtn.classList.add('element__like-button_active');
    }
  }

  removeCardElement() {
    this._element.remove();
  }

  createCard() {

    this._element.querySelector('.element__name').textContent = this._name;
    this._imageCard = this._element.querySelector('.element__image');
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._likesCounter.textContent = this._likes.length;
    this._isLikedByUser();
    this._setEventListeners();

    if(this._ownerId !== this._userId) {
      this._removeBtn.remove();
    }

    return this._element;
  }
}


