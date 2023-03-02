import { Card } from "./Card.js";

export {cardImagePopup, imagePopupElement, imageCaptionPopupElement, openPopup};

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

// Добавление попапов на страницу, их открытие, закрытие и сабмит

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  popupType.addEventListener('click', closePopupByOverlayClick);
  document.addEventListener('keydown', escKeyHandler)
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

editBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);
});

addBtn.addEventListener('click', () => {
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
  const card = new Card(newCard, '#card');
  elementsContent.prepend(card.createCard());
  closePopup(addPopup);
  formNewCardPopup.reset();
  evt.submitter.classList.add('popup__submit-button_disabled');
  evt.submitter.disabled = true;
});