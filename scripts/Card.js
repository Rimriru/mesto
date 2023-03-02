import { initialCards } from "./initial-cards.js";
import { cardImagePopup, imagePopupElement, imageCaptionPopupElement, openPopup } from './index.js';

export {Card};

class Card {
  constructor(cardInfo, templateSelector) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _openPopupHandler() {
    imagePopupElement.src = this._link;
    imagePopupElement.alt = this._name;
    imageCaptionPopupElement.textContent = this._name;
    openPopup(cardImagePopup);
  }

  _likeCardHandler(evt) {
    evt.currentTarget.classList.toggle('element__like-button_active');
  }

  _removeCardHandler(evt) {
    evt.currentTarget.closest('.element').remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
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
    this._setEventListeners();

    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;

    return this._element;
  }
}

initialCards.forEach(item => {
  const card = new Card(item, '#card');
  const cardElement = card.createCard();
  document.querySelector('.elements').append(cardElement);
});

// function openPopupImage(name, link) {
//   imagePopupElement.src = link;
//   imagePopupElement.alt = name;
//   imageCaptionPopupElement.textContent = name;
//   openPopup(cardImagePopup);
// }

// function createCard(name, link) {
//   const card = cardTemplate.content.querySelector('.element').cloneNode(true);
//   const cardImage = card.querySelector('.element__image');
//   const cardName = card.querySelector('.element__name');
//   const likeBtn = card.querySelector('.element__like-button');
//   const removeBtn = card.querySelector('.element__remove-button');

//   cardImage.src = link;
// 	cardImage.alt = name;
// 	cardName.textContent = name;

//   cardImage.addEventListener('click', () => {
//     openPopupImage(cardName.textContent, cardImage.src);
//   });
//   likeBtn.addEventListener('click', () => {
//     likeCardHandler(likeBtn);
//   });
//   removeBtn.addEventListener('click', () => {
//     removeCardHandler(removeBtn);
//   });

//   return card;
// }

// initialCards.forEach(initCard => {
//   elementsContent.append(createCard(initCard.name, initCard.link));
// });

// // Лайк и удаление карточки

// function likeCardHandler(likeButton) {
//   likeButton.classList.toggle('element__like-button_active');
// }

// function removeCardHandler(removeButton) {
// 	removeButton.closest('.element').remove();
// }