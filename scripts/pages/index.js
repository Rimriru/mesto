import {
  editBtn,
  addBtn,
  buttonsClosePopup,
  editPopup,
  addPopup,
  cardImagePopup,
  imagePopupElement,
  imageCaptionPopupElement,
  profileName,
  profileDescription,
  formProfilePopup,
  formNewCardPopup,
  nameInput,
  descriptionInput,
  cardNameInput,
  linkInput,
  elementsContent,
} from '../utils/constants.js';
import { initialCards } from '../utils/initial-cards.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import { FormValidator, formElementsClasses } from '../components/FormValidator.js';

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
