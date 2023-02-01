const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closePopupBtns = document.querySelectorAll('.popup__close-button');
const editPopup = document.querySelector('.popup_type_profile');
const addPopup = document.querySelector('.popup_type_new-card');

const cardImagePopup = document.querySelector('.popup_type_card-image');
let imagePopupElement = document.querySelector('.popup__image');
let imageCaptionPopupElement = document.querySelector('.popup__image-caption');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

const formPopupElements = document.querySelectorAll('.popup__form'); 
let nameInput = document.querySelector('#name');
let descriptionInput = document.querySelector('#description');
let cardNameInput = document.querySelector('#card-name');
let linkInput = document.querySelector('#link');
let newCard = {};

const elementsContent = document.querySelector('.elements');
const footerElement = document.querySelector('.footer');

// Добавление карточек и содержимого на страницу

function renderInitialCards() {
  const cardTemplate = document.querySelector('#card').content;

  initialCards.forEach(item => {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    let initialCardImage = cardElement.querySelector('.element__image');
    let initialCardName = cardElement.querySelector('.element__name');
    const likeBtn = cardElement.querySelector('.element__like-button');
    const removeBtn = cardElement.querySelector('.element__remove-button');

	  initialCardImage.src = item.link;
	  initialCardImage.alt = item.name;
	  initialCardName.textContent = item.name;

    initialCardImage.addEventListener('click', () => {
      openPopup(cardImagePopup);
      imagePopupElement.src = initialCardImage.src;
      imagePopupElement.alt = initialCardImage.alt;
      imageCaptionPopupElement.textContent = initialCardName.textContent;
    });
    likeBtn.addEventListener('click', () => {
      likeCardHandler(likeBtn);
    });
    removeBtn.addEventListener('click', () => {
      removeCardHandler(removeBtn);
    });

    elementsContent.append(cardElement);
  });
}

renderInitialCards();

function renderNewCards(newCard) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  let newCardImage = cardElement.querySelector('.element__image');
  let newCardName = cardElement.querySelector('.element__name');
  const likeBtnNewCard = cardElement.querySelector('.element__like-button');
  const removeBtnNewCard = cardElement.querySelector('.element__remove-button');

  newCardImage.src = newCard.link;
	newCardImage.alt = newCard.name;
	newCardName.textContent = newCard.name;

  newCardImage.addEventListener('click', () => {
    openPopup(cardImagePopup);
    imagePopupElement.src = newCardImage.src;
    imagePopupElement.alt = newCardImage.alt;
    imageCaptionPopupElement.textContent = newCardName.textContent;
  });
  likeBtnNewCard.addEventListener('click', () => {
    likeCardHandler(likeBtnNewCard);
  });
  removeBtnNewCard.addEventListener('click', () => {
    removeCardHandler(removeBtnNewCard);
  });
  
  elementsContent.prepend(cardElement);
}

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

editBtn.addEventListener('click', function() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

addBtn.addEventListener('click', () => {
  openPopup(addPopup);
});

closePopupBtns.forEach(closeBtn => {
  closeBtn.addEventListener('click', (evt) => {
    closePopup(closeBtn.closest('.popup'));
  })
})

formPopupElements.forEach(form => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (form.classList.contains('popup__form_type_profile')) {
      profileName.textContent = nameInput.value;
      profileDescription.textContent = descriptionInput.value;
      closePopup(editPopup);
    } else if (form.classList.contains('popup__form_type_new-card')) {
      newCard.name = cardNameInput.value;
      newCard.link = linkInput.value;
      renderNewCards(newCard);
      closePopup(addPopup);
      formPopupElements[1].reset();
    }
  })
})
