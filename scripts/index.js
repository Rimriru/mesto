import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";
import {FormValidator, formElementsClasses} from "./FormValidator.js";

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
const editPopup = document.querySelector('.popup_type_profile');
const addPopup = document.querySelector('.popup_type_new-card');

const cardImagePopup = document.querySelector('.popup_type_card-image');
const imagePopupElement = document.querySelector('.popup__image');
const imageCaptionPopupElement = document.querySelector('.popup__image-caption');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const formProfilePopup = document.querySelector('.popup__form_type_profile');
const formNewCardPopup = document.querySelector('.popup__form_type_new-card');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const cardNameInput = document.querySelector('#card-name');
const linkInput = document.querySelector('#link');

const elementsContent = document.querySelector('.elements');

// Создание экземпляров форм, проверка на валидность

const formProfilePopupValidation = new FormValidator(formElementsClasses, formProfilePopup);
formProfilePopupValidation.enableValidation();

const formNewCardPopupValidation = new FormValidator(formElementsClasses, formNewCardPopup);
formNewCardPopupValidation.enableValidation();

// Добавление попапов на страницу, их открытие, закрытие и сабмит

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  popupType.addEventListener('click', closePopupByOverlayClick);
  document.addEventListener('keydown', escKeyHandler)
}

const openImagePopup = function() {
  imagePopupElement.src = this._link;
  imagePopupElement.alt = this._name;
  imageCaptionPopupElement.textContent = this._name;
  openPopup(cardImagePopup);
}

function resetFormPopup(evt) {
  if(evt.target === addBtn) {
    formNewCardPopup.reset();
    formNewCardPopupValidation.resetInputError();
  } else {
    formProfilePopupValidation.resetInputError();
  }
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
  popupType.removeEventListener('click', closePopupByOverlayClick);
  document.removeEventListener('keydown', escKeyHandler);
}

function closePopupByOverlayClick (evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  }
}

function escKeyHandler(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function createCard(cardInfo, templateSelector, openPopupHandler) {
  const card = new Card(cardInfo, templateSelector, openPopupHandler);
  return card;
}

editBtn.addEventListener('click', (evt) => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  resetFormPopup(evt);
  openPopup(editPopup);
});

addBtn.addEventListener('click', (evt) => {
  resetFormPopup(evt);
  openPopup(addPopup);
});

buttonsClosePopup.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closePopup(closeBtn.closest('.popup'));
  })
});

formProfilePopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editPopup);
});

formNewCardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {};

  newCard.name = cardNameInput.value;
  newCard.link = linkInput.value;
  const card = createCard(newCard, '#card', openImagePopup);
  formNewCardPopupValidation.disableSubmitButton();
  elementsContent.prepend(card.createCard());
  closePopup(addPopup);
  formNewCardPopup.reset();
});

initialCards.forEach(item => {
  const card = createCard(item, '#card', openImagePopup);
  const cardElement = card.createCard();
  elementsContent.append(cardElement);
});
