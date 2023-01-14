// To open and close popup by edit button and cross

let editBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupBtn = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let nameInput = document.querySelector('.popup__person_input_name');
let profileDescription = document.querySelector('.profile__description');
let descriptionInput = document.querySelector('.popup__person_input_description');
let formPopupElement = document.querySelector('.popup__form'); 

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// To submit the popup form and save values of name and description from user input

editBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

formPopupElement.addEventListener('submit', function(event) {
  event.preventDefault();
  profileName.textContent = `${nameInput.value}`;
  profileDescription.textContent = `${descriptionInput.value}`;
  closePopup();
});
