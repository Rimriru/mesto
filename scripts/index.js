const editBtn = document.querySelector('.profile__edit-button');
let editPopupElement = document.querySelector('.popup_type_profile');
let addPopupElement = document.querySelector('.popup_type_new-card');
const closePopupBtn = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let nameInput = document.querySelector('.popup__person_input_name');
let profileDescription = document.querySelector('.profile__description');
let descriptionInput = document.querySelector('.popup__person_input_description');
let formPopupElement = document.querySelector('.popup__form'); 

const elementsContent = document.querySelector('.elements');

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
    likeBtn.addEventListener('click', likeCardHandler(likeBtn));
    removeBtn.addEventListener('click', removeCardHandler(removeBtn));

    elementsContent.append(cardElement);
  });
}

renderInitialCards();

function renderNewCards(newCard) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const likeBtnNewCard = cardElement.querySelector('.element__like-button');
  const removeBtnNewCard = cardElement.querySelector('.element__remove-button');

  cardElement.querySelector('.element__image').src = newCard.link;
	cardElement.querySelector('.element__image').alt = newCard.name;
	cardElement.querySelector('.element__name').textContent = newCard.name;

  likeBtnNewCard.addEventListener('click', likeCardHandler(likeBtnNewCard));
  removeBtnNewCard.addEventListener('click', removeCardHandler(removeBtnNewCard));
  
  elementsContent.prepend(cardElement);
}

// Лайк и удаление карточки

// const likeBtn = document.querySelectorAll('.element__like-button');
// const removeBtn = document.querySelectorAll('.element__remove-button');

function likeCardHandler(likeButton) {
  likeButton.classList.toggle('element__like-button_active');
}

function removeCardHandler(removeButton) {
  let closestCard = removeButton.closest('.element');
	closestCard.remove();
}

// likeBtn.forEach(like => {
//   like.addEventListener('click', likeCardHandler(like));
// });

// removeBtn.forEach(del => {
// 	del.addEventListener('click', removeCardHandler(del));
// });


// To open and close popup by edit button and cross

// function openPopup() {
//   popup.classList.add('popup_opened');
//   nameInput.value = profileName.textContent;
//   descriptionInput.value = profileDescription.textContent;
// }

// function closePopup() {
//   popup.classList.remove('popup_opened');
// }

// editBtn.addEventListener('click', openPopup);
// closePopupBtn.addEventListener('click', closePopup);

// To submit the popup form and save values of name and description from user input

// formPopupElement.addEventListener('submit', function(event) {
//   event.preventDefault();
//   profileName.textContent = `${nameInput.value}`;
//   profileDescription.textContent = `${descriptionInput.value}`;
//   closePopup();
// });