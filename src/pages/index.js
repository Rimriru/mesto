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
  avatarPopupSelector,
  confirmPopupSelector,
  profileAvatarSelector,
  profileNameSelector,
  profileDescriptionSelector,
  formProfilePopup,
  formAvatarPopup,
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
const formAvatarPopupValidation = new FormValidator(formElementsClasses, formAvatarPopup);
const formNewCardPopupValidation = new FormValidator(formElementsClasses, formNewCardPopup);

function resetFormPopup(evt) {
  if(evt.currentTarget === addBtn) {
    formNewCardPopup.reset();
    formNewCardPopupValidation.resetInputError();
  } else if (evt.currentTarget === changeAvatarBtn) {
    formAvatarPopup.reset();
    formAvatarPopupValidation.resetInputError();
  } else {
    formProfilePopupValidation.resetInputError();
  }
}

// сбор данных профиля пользователя

const profileInfo = new UserInfo({
  nameSelector: profileNameSelector, 
  descriptionSelector: profileDescriptionSelector,
  avatarSelector: profileAvatarSelector
});

// создание экземпляра апи

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co',
  headers: {
    authorization: '1b47af07-4c33-4bad-9262-4cd7024f33a0',
    'Content-Type': 'application/json'
  }
});

// создание экземпляров форм


const handleCardClick = ({name, link}) => {
  popupImage.open({name, link});
}

const handleRemoveBtnClick = (card) => {
  popupConfirm.setConfirmHandler(() => {
    api.removeCard(card._cardId)
    .then(() => {
      card._element.remove();
    })
    .catch((err) => {
      console.log(err);
    });
  });
  popupConfirm.open();
}

const likeCardHandler = (card) => {
  api.addLikeCard(card._cardId)
  .then((newCardObj) => {
    card.updateLikesCounter(newCardObj.likes);
  });
}

const removeLikeCardHandler = (card) => {
  api.removeLikeCard(card._cardId)
  .then((newCardObj) => {
    card.updateLikesCounter(newCardObj.likes);
  });
}

const createCard = (item, userId) => {
  return new Card(item, cardTemplateSelector, handleCardClick, handleRemoveBtnClick, likeCardHandler, removeLikeCardHandler, userId).createCard();
}

const cardRenderer = new Section(createCard, elementsSelector);

const submitProfileFormHandler = (inputValues) => {
  popupFormProfile.changeSubmitButtonState(true);
  api.editUserInfo(inputValues).then(res => {
    profileInfo.setUserInfo(res);
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    popupFormProfile.changeSubmitButtonState(false);
    popupFormProfile.close();
    formProfilePopupValidation.disableSubmitButton();
  });
}

const submitNewCardFormHandler = (inputValues) => {
  api.addNewCard(inputValues)
  .then(res => {
    cardRenderer.addItem(createCard(res, profileInfo.getUserId()));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    formNewCardPopupValidation.disableSubmitButton();
  });
}

const submitAvatarChangeFormHandler = (inputValues) => {
  popupFormAvatar.changeSubmitButtonState(true);
  api.changeUserAvatar(inputValues).then(res => {
    profileInfo.setUserAvatar(res.avatar);
  })
  .catch(err => console.log(err))
  .finally(() => {
    popupFormAvatar.changeSubmitButtonState(false);
  })
}

const popupFormProfile = new PopupWithForm(editPopupSelector, submitProfileFormHandler);
const popupFormAvatar = new PopupWithForm(avatarPopupSelector, submitAvatarChangeFormHandler);
const popupFormNewCard = new PopupWithForm(addPopupSelector, submitNewCardFormHandler);
const popupConfirm = new PopupWithConfirmation(confirmPopupSelector);
const popupImage = new PopupWithImage(cardImagePopupSelector);

api.getUserInfo()
.then(userObj => {
  const userId = userObj._id;
  profileInfo.setUserId(userId);
  profileInfo.setUserInfo(userObj);
  profileInfo.setUserAvatar(userObj.avatar);

  api.getInitialCards()
  .then(cardsArray => {
    cardRenderer.renderItems(cardsArray, userId);
  })
  .catch((err) => console.log(err));
})
.catch((err) => console.log(err))
.finally(() => {
  popupFormProfile.setEventListeners();
  popupFormAvatar.setEventListeners();
  popupFormNewCard.setEventListeners();
  popupImage.setEventListeners();
  popupConfirm.setEventListeners();
  formProfilePopupValidation.enableValidation();
  formAvatarPopupValidation.enableValidation();
  formNewCardPopupValidation.enableValidation();
})

changeAvatarBtn.addEventListener('click', (evt) => {
  resetFormPopup(evt);
  popupFormAvatar.open();
});

editBtn.addEventListener('click', (evt) => {
  resetFormPopup(evt);
  popupFormProfile.setInputValues(profileInfo.getUserInfo());
  popupFormProfile.open();
});

addBtn.addEventListener('click', (evt) => {
  resetFormPopup(evt);
  popupFormNewCard.open();
});

