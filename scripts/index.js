// To open and close popup by edit button and cross

let editBtn = document.querySelector('.edit-button');
let popup = document.querySelector('.popup');
let closePopupBtn = document.querySelector('.popup__close-button');

editBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// To submit the popup form and save values of name and description from user input

let profileName = document.querySelector('.profile-info__name');
let nameInput = document.querySelector('.popup__person_input_name');
let profileDescription = document.querySelector('.profile-info__description');
let descriptionInput = document.querySelector('.popup__person_input_description');
let formPopupElement = document.querySelector('.popup__form');

formPopupElement.addEventListener('submit', function(event) {
  event.preventDefault();
  let name = nameInput.value;
  let description = descriptionInput.value;
  profileName.textContent = `${name}`;
  profileDescription.textContent = `${description}`;
  closePopup();
});
