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

let profileName = document.querySelector('.profile-info__name');
let nameInput = document.querySelector('.popup__person_input_name');
let profileDescription = document.querySelector('.profile-info__description');
let descriptionInput = document.querySelector('.popup__person_input_description');
let submitPopupBtn = document.querySelector('.popup__submit-button');

submitPopupBtn.addEventListener('click', function(event) {
  event.preventDefault();
  let name = nameInput.value;
  let description = descriptionInput.value;
  profileName.textContent = `${name}`;
  profileDescription.textContent = `${description}`;
  closePopup();
});
