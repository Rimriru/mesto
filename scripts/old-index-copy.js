const editBtn = document.querySelector('.profile__edit-button');
let editPopupElement = document.querySelector('.popup_type_profile');
const addBtn = document.querySelector('.profile__add-button');
let addPopupElement = document.querySelector('.popup_type_new-card');
const closePopupBtn = document.querySelectorAll('.popup__close-button');

const formPopupElement = document.querySelectorAll('.popup__form'); 
let profileName = document.querySelector('.profile__name');
let nameInput = document.querySelector('#name');
let profileDescription = document.querySelector('.profile__description');
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
    const likeBtn = cardElement.querySelector('.element__like-button');
    const removeBtn = cardElement.querySelector('.element__remove-button');

	  cardElement.querySelector('.element__image').src = item.link;
	  cardElement.querySelector('.element__image').alt = item.name;
	  cardElement.querySelector('.element__name').textContent = item.name;
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
  const elementsContent = document.querySelector('.elements');
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const likeBtnNewCard = cardElement.querySelector('.element__like-button');
  const removeBtnNewCard = cardElement.querySelector('.element__remove-button');

  cardElement.querySelector('.element__image').src = newCard.link;
	cardElement.querySelector('.element__image').alt = newCard.name;
	cardElement.querySelector('.element__name').textContent = newCard.name;
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
  let closestCard = removeButton.closest('.element');
	closestCard.remove();
}

// Добавление попапов на страницу, их открытие, закрытие и сабмит

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
}

editBtn.addEventListener('click', function() {
  openPopup(editPopupElement);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

addBtn.addEventListener('click', () => {
  openPopup(addPopupElement);
});

closePopupBtn.forEach(closeBtn => {
  closeBtn.addEventListener('click', (evt) => {
    closePopup(closeBtn.closest('.popup'));
  })
})

formPopupElement.forEach(form => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (form.classList.contains('popup__form_type_profile')) {
      profileName.textContent = nameInput.value;
      profileDescription.textContent = descriptionInput.value;
      closePopup(editPopupElement);
    } else if (form.classList.contains('popup__form_type_new-card')) {
      newCard.name = cardNameInput.value;
      newCard.link = linkInput.value;
      renderNewCards(newCard);
      closePopup(addPopupElement);
      formPopupElement[1].reset();
    }
  })
})
