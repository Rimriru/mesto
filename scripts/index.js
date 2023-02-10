const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
const editPopup = document.querySelector('.popup_type_profile');
const addPopup = document.querySelector('.popup_type_new-card');

const cardTemplate = document.querySelector('#card');
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

// Добавление карточек и содержимого на страницу

function openPopupImage(name, link) {
  imagePopupElement.src = link;
  imagePopupElement.alt = name;
  imageCaptionPopupElement.textContent = name;
  openPopup(cardImagePopup);
}

function createCard(name, link) {
  const card = cardTemplate.content.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardName = card.querySelector('.element__name');
  const likeBtn = card.querySelector('.element__like-button');
  const removeBtn = card.querySelector('.element__remove-button');

  cardImage.src = link;
	cardImage.alt = name;
	cardName.textContent = name;

  cardImage.addEventListener('click', () => {
    openPopupImage(cardName.textContent, cardImage.src);
  });
  likeBtn.addEventListener('click', () => {
    likeCardHandler(likeBtn);
  });
  removeBtn.addEventListener('click', () => {
    removeCardHandler(removeBtn);
  });

  return card;
}

initialCards.forEach(initCard => {
  elementsContent.append(createCard(initCard.name, initCard.link));
});

// Лайк и удаление карточки

function likeCardHandler(likeButton) {
  likeButton.classList.toggle('element__like-button_active');
}

function removeCardHandler(removeButton) {
	removeButton.closest('.element').remove();
}

// Добавление попапов на страницу, их открытие, закрытие и сабмит

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
}

function escKeyHandler(evt) {
  if (evt.key === "Escape") {
    closePopup(evt.target);
    evt.target.removeEventListener('keydown', escKeyHandler);
  }
}

function closePopupByOverlayClick (evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  }
}

function enterKeyHandler(event, formType) {
  if (event.key === 'Enter') {
    formType.submit();
  }
}

editBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);

  editPopup.addEventListener('keydown', escKeyHandler);
  editPopup.addEventListener('click', closePopupByOverlayClick);
  nameInput.addEventListener('keydown', (evt) => {
    enterKeyHandler(evt, formProfilePopup);
  });
  descriptionInput.addEventListener('keydown', (evt) => {
    enterKeyHandler(evt, formProfilePopup);
  });
});

addBtn.addEventListener('click', () => {
  openPopup(addPopup);
  addPopup.addEventListener('keydown', escKeyHandler);
  addPopup.addEventListener('click', closePopupByOverlayClick);
  cardNameInput.addEventListener('keydown', (evt) => {
    enterKeyHandler(evt, formNewCardPopup);
  });
  linkInput.addEventListener('keydown', (evt) => {
    enterKeyHandler(evt, formNewCardPopup);
  });
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
  elementsContent.prepend(createCard(newCard.name, newCard.link));
  closePopup(addPopup);
  formNewCardPopup.reset();
});