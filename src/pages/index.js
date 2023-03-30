const logo = new URL('../images/logo/logo-mesto.svg', import.meta.url);
const avatar = new URL('../images/avatar.jpg', import.meta.url);
const avatarChangeIcon = new URL('../images/avatar-icon.svg', import.meta.url);
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
  { name: 'avatarChangeIcon', image: avatarChangeIcon },
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
  changeAvatarBtn,
  editBtn,
  addBtn,
  editPopupSelector,
  addPopupSelector,
  cardImagePopupSelector,
  updateAvatarPopupSelector,
  confirmPopupSelector,
  profileAvatarImage,
  profileNameSelector,
  profileDescriptionSelector,
  formProfilePopup,
  formNewCardPopup,
  cardTemplateSelector,
  elementsSelector,
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import { FormValidator, formElementsClasses } from '../components/FormValidator.js';

// cоздание экземпляров форм, проверка на валидность, очистка ошибок

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

const profileInfo = new UserInfo({nameSelector: profileNameSelector, descriptionSelector: profileDescriptionSelector});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co',
  headers: {
    authorization: '1b47af07-4c33-4bad-9262-4cd7024f33a0',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo().then(userObj => {
  const userId = userObj._id;
  profileInfo.setUserInfo(userObj);
  profileAvatarImage.src = userObj.avatar;

  api.getInitialCards().then(cardsArray => {
    cardRenderer.renderItems(cardsArray, userId);
  });
});

// api.likeCard({isLiked: true}).then(res => {
//   console.log(res);
// });

// обработчик клика по карточке, создание карточки, добавление на на страницу

const cardRemoveHandler = () => {
  api.removeCard().then(res => {
    console.log(res);
  });
}

const popupConfirm = new PopupWithConfirmation(confirmPopupSelector, {
  confirmHandler: cardRemoveHandler
});
popupConfirm.setEventListeners();

const handleCardClick = ({name, link}) => {
  popupImage.open({name, link});
}

const handleRemoveBtnClick = () => {
  popupConfirm.open();
}

const createCard = (item, userId) => {
  return new Card(item, cardTemplateSelector, handleCardClick, handleRemoveBtnClick, userId).createCard();
}

const cardRenderer = new Section(createCard, elementsSelector);

// создание экземпляров попапов, навешивание слушателей

const popupImage = new PopupWithImage(cardImagePopupSelector);
popupImage.setEventListeners();

// const submitUpdAvatarFormHandler = () => {
  // api new method - change user avatar with patch request
// }

// const popupFormUpdAvatar = new PopupWithForm(updateAvatarPopupSelector, {
//   submitFormHandler: submitUpdAvatarFormHandler
// });
// popupFormUpdAvatar.setEventListeners();

// const changeSubmitButtonLoadingState = (evt, isLoading) => {
//   return isLoading ? evt.submitter.textContent = 'Сохранение...' : evt.submitter.textContent = 'Сохранение';
// }

const submitProfileFormHandler = (inputValues) => {
  api.editUserInfo(inputValues).then(res => {
    console.log(res);
    // changeSubmitButtonLoadingState(evt, true);
    profileInfo.setUserInfo(res);
  })
  // .finally(
  //   changeSubmitButtonLoadingState(evt, false)
  // );
  popupFormProfile.close();
  formProfilePopupValidation.disableSubmitButton();
}

const popupFormProfile = new PopupWithForm(editPopupSelector, {
  submitFormHandler: submitProfileFormHandler
});
popupFormProfile.setEventListeners();

const submitNewCardFormHandler = (inputValues) => {
  api.addNewCard(inputValues).then(res => {
    cardRenderer.addItem(createCard(res));
  });
  formNewCardPopupValidation.disableSubmitButton();
}

const popupFormNewCard = new PopupWithForm(addPopupSelector, {
  submitFormHandler: submitNewCardFormHandler
});
popupFormNewCard.setEventListeners();

// открытие попапов редактирования профиля и создания новой карточки

changeAvatarBtn.addEventListener('click', () => {

});

editBtn.addEventListener('click', (evt) => {
  popupFormProfile.setInputValues(profileInfo.getUserInfo());
  popupFormProfile.open();
  resetFormPopup(evt);
});

addBtn.addEventListener('click', (evt) => {
  resetFormPopup(evt);
  popupFormNewCard.open();
});