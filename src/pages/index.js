import './index.css'
import {
  changeAvatarBtn,
  editBtn,
  addBtn,
  selectorPopupProfile,
  selectorPopupNewCard,
  selectorPopupCardImage,
  selectorPopupAvatar,
  selectorPopupConfirm,
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

// создание карточки

const handleCardClick = ({name, link}) => {
  popupImage.open({name, link});
}

const handleRemoveBtnClick = (card) => {
  popupConfirm.setConfirmHandler(() => {
    api.removeCard(card._cardId)
    .then(() => {
      card.removeCardElement();
      popupConfirm.close();
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
    card.changeLikeButtonState();
    card.updateLikesCounter(newCardObj.likes);
  })
  .catch((err) => {
    console.log(err);
  })
}

const removeLikeCardHandler = (card) => {
  api.removeLikeCard(card._cardId)
  .then((newCardObj) => {
    card.changeLikeButtonState();
    card.updateLikesCounter(newCardObj.likes);
  })
  .catch(err => console.log(err))
}

const createCard = (item) => {
  const userId = profileInfo.getUserId();
  return new Card(item, cardTemplateSelector, handleCardClick, handleRemoveBtnClick, likeCardHandler, removeLikeCardHandler, userId).createCard();
}

const cardRenderer = new Section(createCard, elementsSelector);

// создание экземпляров попапов

const submitProfileFormHandler = (inputValues) => {
  popupFormProfile.changeSubmitButtonState(true);
  api.editUserInfo(inputValues).then(res => {
    profileInfo.setUserInfo(res);
    popupFormProfile.close();
    formProfilePopupValidation.disableSubmitButton();
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    popupFormProfile.changeSubmitButtonState(false);
  });
}

const submitNewCardFormHandler = (inputValues) => {
  api.addNewCard(inputValues)
  .then(res => {
    cardRenderer.addItem(createCard(res));
    popupFormNewCard.close();
    formNewCardPopupValidation.disableSubmitButton();
  })
  .catch((err) => {
    console.log(err);
  })
}

const submitAvatarChangeFormHandler = (inputValues) => {
  popupFormAvatar.changeSubmitButtonState(true);
  api.changeUserAvatar(inputValues).then(res => {
    profileInfo.setUserAvatar(res.avatar);
    popupFormAvatar.close();
    formAvatarPopupValidation.disableSubmitButton();
  })
  .catch(err => console.log(err))
  .finally(() => {
    popupFormAvatar.changeSubmitButtonState(false);
  })
}

const popupFormProfile = new PopupWithForm(selectorPopupProfile, submitProfileFormHandler);
const popupFormAvatar = new PopupWithForm(selectorPopupAvatar, submitAvatarChangeFormHandler);
const popupFormNewCard = new PopupWithForm(selectorPopupNewCard, submitNewCardFormHandler);
const popupConfirm = new PopupWithConfirmation(selectorPopupConfirm);
const popupImage = new PopupWithImage(selectorPopupCardImage);

// первичный запрос с наполнением страницы и запуском слушателей и валидации

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(res => {
  const userObj = res[0];
  const cardsArray = res[1];

  const {avatar, _id} = userObj;
  profileInfo.setUserId(_id);
  profileInfo.setUserInfo(userObj);
  profileInfo.setUserAvatar(avatar);

  cardRenderer.renderItems(cardsArray);
})
.catch(err => console.log(`Ошибка: ${err}`))
.finally(() => {
    popupFormProfile.setEventListeners();
    popupFormAvatar.setEventListeners();
    popupFormNewCard.setEventListeners();
    popupImage.setEventListeners();
    popupConfirm.setEventListeners();
    formProfilePopupValidation.enableValidation();
    formAvatarPopupValidation.enableValidation();
    formNewCardPopupValidation.enableValidation();
  });

// открытие попапов

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

