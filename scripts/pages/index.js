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
  cardNameInput,
  linkInput,
  elementsSelector,
} from '../utils/constants.js';
import { initialCards } from '../utils/initial-cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import { FormValidator, formElementsClasses } from '../components/FormValidator.js';

// Создание экземпляров форм, проверка на валидность

const formProfilePopupValidation = new FormValidator(formElementsClasses, formProfilePopup);
formProfilePopupValidation.enableValidation();

const formNewCardPopupValidation = new FormValidator(formElementsClasses, formNewCardPopup);
formNewCardPopupValidation.enableValidation();


const profileInfo = new UserInfo({nameSelector: profileName, descriptionSelector: profileDescription});

// function openPopup(popupType) {
//   popupType.classList.add('popup_opened');
//   popupType.addEventListener('click', closePopupByOverlayClick);
//   document.addEventListener('keydown', escKeyHandler)
// }

// const openImagePopup = function() {
//   imagePopupElement.src = this._link;
//   imagePopupElement.alt = this._name;
//   imageCaptionPopupElement.textContent = this._name;
//   openPopup(cardImagePopup);
// }

function resetFormPopup(evt) {
  if(evt.target === addBtn) {
    formNewCardPopup.reset();
    formNewCardPopupValidation.resetInputError();
  } else {
    formProfilePopupValidation.resetInputError();
  }
}

// function closePopup(popupType) {
//   popupType.classList.remove('popup_opened');
//   popupType.removeEventListener('click', closePopupByOverlayClick);
//   document.removeEventListener('keydown', escKeyHandler);
// }

// function closePopupByOverlayClick (evt) {
//   if (evt.currentTarget === evt.target) {
//     closePopup(evt.target);
//   }
// }

// function escKeyHandler(evt) {
//   if (evt.key === "Escape") {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   }
// }

const handleCardClick = ({name, link}) => {
  const popupImage = new PopupWithImage(cardImagePopupSelector);
  popupImage.open({name, link});
}

// получение наполненной карточки

const createCard = (item) => {
  return new Card(item, cardTemplateSelector, handleCardClick).createCard();
}

editBtn.addEventListener('click', (evt) => {
  const popupForm = new PopupWithForm(editPopupSelector, {
    submitFormHandler: (evt) => {
      evt.preventDefault();
      profileInfo.setUserInfo(popupForm._getInputValues());
      popupForm.close();
    }
  });
  popupForm.open(profileInfo.getUserInfo());
  resetFormPopup(evt);
});

// addBtn.addEventListener('click', (evt) => {
//   resetFormPopup(evt);
//   const popupForm = new PopupWithForm(addPopupSelector, {
//     submitFormHandler: (evt) => {
//       evt.preventDefault();
//       formNewCardPopupValidation.disableSubmitButton();
//       const cardAppend = new Section({
//         items: popupForm._getInputValues(),
//         renderer: (item) => {
//           const card = createCard(item);
//       }}, elementsSelector);
//       cardAppend.addItem(card.createCard());
//     }
//   });
// });

formNewCardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {};

  newCard.name = cardNameInput.value;
  newCard.link = linkInput.value;
  // const card = createCard(newCard, '#card', {
  //   handleCardClick: () => {
  //     const popupImage = new PopupWithImage(cardImagePopupSelector);
  //     popupImage.open();
  //   }
  // });
  formNewCardPopupValidation.disableSubmitButton();
  // elementsContent.prepend(card.createCard());
  // closePopup(addPopup);
  formNewCardPopup.reset();
});

const initialCardsRender = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    initialCardsRender.addItem(false, card);
  },
}, elementsSelector);

initialCardsRender.renderItems();

