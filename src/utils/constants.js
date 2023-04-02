const logo = new URL('../images/logo/logo-mesto.svg', import.meta.url);
const defaultAvatar = new URL('../images/default-avatar.png', import.meta.url);
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
  { name: 'defaultAvatar', image: defaultAvatar },
  { name: 'avatarChangeIcon', image: avatarChangeIcon },
  { name: 'editBtn', image: editBtnImage },
  { name: 'addBtn', image: addBtnImage },
  { name: 'addBtnLarge', image: addBtnImageLarge },
  { name: 'closeBtn', image: closeBtnImage },
  { name: 'likeBtn', image: likeBtnImage },
  { name: 'likeBtnActive', image: likeBtnImageActive },
  { name: 'removeButton', image: removeButtonImage },
];

export const changeAvatarBtn = document.querySelector('.profile__avatar');
export const editBtn = document.querySelector('.profile__edit-button');
export const addBtn = document.querySelector('.profile__add-button');

export const selectorPopupProfile = '.popup_type_profile';
export const selectorPopupNewCard = '.popup_type_new-card';
export const selectorPopupCardImage = '.popup_type_card-image';
export const selectorPopupAvatar = '.popup_type_avatar';
export const selectorPopupConfirm = '.popup_type_confirm';

export const formProfilePopup = document.querySelector('.popup__form_type_profile');
export const formAvatarPopup = document.querySelector('.popup__form_type_avatar');
export const formNewCardPopup = document.querySelector('.popup__form_type_new-card');

export const profileAvatarSelector = '.profile__avatar-image';
export const profileNameSelector = '.profile__name';
export const profileDescriptionSelector = '.profile__description';
export const cardTemplateSelector = '#card';

export const elementsSelector = '.elements';