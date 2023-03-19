const logo = new URL('../images/logo/logo-mesto.svg', import.meta.url);
const avatar = new URL('../images/avatar.jpg', import.meta.url);
const editBtnImage = new URL('../images/edit-button.svg', import.meta.url);
const addBtnImage = new URL('../images/add-button.svg', import.meta.url);
const addBtnImageLarge = new URL('../images/add-button-large.svg', import.meta.url);
const closeBtnImage = new URL('../images/close-button.svg', import.meta.url);
const likeBtnImage = new URL('../images/like-button.svg', import.meta.url);
const likeBtnImageActive = new URL('../images/like-button_active.svg', import.meta.url);
const removeButtonImage = new URL('../images/remove-card-button.svg', import.meta.url);

const images = [
  { name: 'logo', image: logo },
  { name: 'avatar', image: avatar },
  { name: 'editBtn', image: editBtnImage },
  { name: 'addBtn', image: addBtnImage },
  { name: 'addBtnLarge', image: addBtnImageLarge },
  { name: 'closeBtn', image: closeBtnImage },
  { name: 'likeBtn', image: likeBtnImage },
  { name: 'likeBtnActive', image: likeBtnImageActive },
  { name: 'removeButton', image: removeButtonImage },
];

import './index.css'
import {
  editBtn,
  addBtn,
  editPopupSelector,
  addPopupSelector,
  cardImagePopupSelector,
  profileName,
  profileDescription,
  formProfilePopup,
  formNewCardPopup,
  cardTemplateSelector,
  elementsSelector,
} from '../scripts/utils/constants.js';
import { initialCards } from '../scripts/utils/initial-cards.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Card from '../scripts/components/Card.js';
import { FormValidator, formElementsClasses } from '../scripts/components/FormValidator.js';

// Создание экземпляров форм, проверка на валидность, очистка ошибок

const formProfilePopupValidation = new FormValidator(formElementsClasses, formProfilePopup);
formProfilePopupValidation.enableValidation();

const formNewCardPopupValidation = new FormValidator(formElementsClasses, formNewCardPopup);
formNewCardPopupValidation.enableValidation();

function resetFormPopup(evt) {
  if(evt.target === addBtn) {
    formNewCardPopup.reset();
    formNewCardPopupValidation.resetInputError();
  } else {
    formProfilePopupValidation.resetInputError();
  }
}

// сбор данных профиля пользователя

const profileInfo = new UserInfo({nameSelector: profileName, descriptionSelector: profileDescription});

// создание экземпляров попапов




// обработчик клика по карточке -> открытие попапа картинки

const handleCardClick = ({name, link}) => {
  popupImage.open({name, link});
}

const createCard = (item) => {
  return new Card(item, cardTemplateSelector, handleCardClick).createCard();
}

const cardRenderData = {
  data: initialCards,
  renderer: createCard
};

const cardRenderer = new Section(cardRenderData, elementsSelector);
cardRenderer.renderItems();

const popupImage = new PopupWithImage(cardImagePopupSelector);
popupImage.setEventListeners();

const submitProfileFormHandler = (inputValues) => {
  profileInfo.setUserInfo(inputValues);
}

const popupFormProfile = new PopupWithForm(editPopupSelector, {
  submitFormHandler: submitProfileFormHandler
});
popupFormProfile.setEventListeners();

const submitNewCardFormHandler = (inputValues) => {
  cardRenderer.addItem(true, createCard(inputValues));
}

const popupFormNewCard = new PopupWithForm(addPopupSelector, {
  submitFormHandler: submitNewCardFormHandler
});
popupFormNewCard.setEventListeners();

// открытие попапов редактирования профиля и создания новой карточки

editBtn.addEventListener('click', (evt) => {
  popupFormProfile.setInputValues(profileInfo.getUserInfo());
  popupFormProfile.open();
  resetFormPopup(evt);
});

addBtn.addEventListener('click', (evt) => {
  resetFormPopup(evt);
  popupFormNewCard.open();
});