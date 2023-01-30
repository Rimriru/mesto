const elementsContent = document.querySelector('.elements');
const profileSectionElement = document.querySelector('.profile');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const footerElement = document.querySelector('.footer');

const initialCards = [
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1557094005-176cbfe3554d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1634&q=80'
  },
  {
    name: 'Республика Коми',
    link: 'https://images.unsplash.com/photo-1525302220185-c387a117886e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
  },
  {
    name: 'Озеро Байкал',
    link: 'https://images.unsplash.com/photo-1584891686381-c099f8cbd70c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80'
  },
  {
    name: 'Таганай',
    link: 'https://images.unsplash.com/photo-1521531105925-7c51dffd5098?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'
  },
  {
    name: 'Чернский район',
    link: 'https://images.unsplash.com/photo-1444894423756-1bb106dce5a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1071&q=80'
  },
  {
    name: 'Остров Ольхон',
    link: 'https://images.unsplash.com/photo-1490879112094-281fea0883dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
  }
]; 

// Добавление карточек и содержимого на страницу

function renderInitialCards() {
  const cardTemplate = document.querySelector('#card').content;

  initialCards.forEach(item => {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

	  cardElement.querySelector('.element__image').src = item.link;
	  cardElement.querySelector('.element__image').alt = item.name;
	  cardElement.querySelector('.element__name').textContent = item.name;

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
    likeBtnNewCard.classList.toggle('element__like-button_active');
  });
  removeBtnNewCard.addEventListener('click', () => {
    const closestCard = removeBtnNewCard.closest('.element');
	  closestCard.remove();
  });
  
  elementsContent.prepend(cardElement);
}

// Лайк и удаление карточки

const likeBtn = document.querySelectorAll('.element__like-button');
const removeBtn = document.querySelectorAll('.element__remove-button');

likeBtn.forEach(like => {
	like.addEventListener('click', () => {
	  like.classList.toggle('element__like-button_active');
	});
});

removeBtn.forEach(del => {
	del.addEventListener('click', () => {
	  const closestCard = del.closest('.element');
	  closestCard.remove();
	});
});

// Добавление попапов на страницу, их открытие, закрытие и сабмит

profileSectionElement.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('profile__edit-button')) {
    renderEditPopup();
  } else if (evt.target.classList.contains('profile__add-button')) {
    renderAddPopup();
  }
});

function renderEditPopup() {
  const popupTemplate = document.querySelector('#popup').content;
  const popupElement = popupTemplate.querySelector('.popup').cloneNode(true);
  let popupNameInput = popupElement.querySelector('.popup__person_input_name');
  let popupDescInput = popupElement.querySelector('.popup__person_input_description');

  popupElement.querySelector('.popup__heading').textContent = 'Редактировать\u00A0профиль';
  popupNameInput.value = profileName.textContent;
  popupNameInput.placeholder = 'Введите имя профиля'
  popupDescInput.value = profileDescription.textContent;
  popupDescInput.placeholder = 'Введите описание профиля';
  popupElement.querySelector('.popup__submit-button').textContent = 'Сохранить';
  popupElement.classList.add('popup_opened');

  popupElement.querySelector('.popup__close-button').addEventListener('click', () => {
    popupElement.remove();
  });

  popupElement.querySelector('.popup__form').addEventListener('submit', function submitEditPopup(evt) {
    evt.preventDefault();
    profileName.textContent = `${popupNameInput.value}`;
    profileDescription.textContent = `${popupDescInput.value}`;
    popupElement.classList.remove('popup_opened');
  });

  footerElement.after(popupElement);
}

function renderAddPopup() {
  const popupTemplate = document.querySelector('#popup').content;
  const popupElement = popupTemplate.querySelector('.popup').cloneNode(true);
  let popupNameInput = popupElement.querySelector('.popup__person_input_name');
  let popupDescInput = popupElement.querySelector('.popup__person_input_description');
  let newCard = {};

  popupElement.querySelector('.popup__heading').textContent = 'Новое\u00A0место';
  popupElement.querySelector('.popup__person_input_name').placeholder = 'Название';
  popupElement.querySelector('.popup__person_input_description').placeholder = 'Ссылка на картинку';
  popupElement.querySelector('.popup__submit-button').textContent = 'Создать';
  popupElement.classList.add('popup_opened');

  popupElement.querySelector('.popup__close-button').addEventListener('click', () => {
    popupElement.classList.remove('popup_opened');
  });
  
  popupElement.querySelector('.popup__form').addEventListener('submit', function submitAddPopup(evt) {
    evt.preventDefault();
    newCard.name = `${popupNameInput.value}`;
    newCard.link = `${popupDescInput.value}`;
    renderNewCards(newCard);
    popupElement.classList.remove('popup_opened');
  });

  footerElement.after(popupElement);
}
