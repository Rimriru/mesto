const formElementsClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__person',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: '.popup__person_type_error',
  errorClass: '.popup__error_visible'
};

function showInputError(formElement, inputElement, errorMessage) {
  const inputErrorMessage = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__person_type_error');
  inputErrorMessage.classList.add('popup__error_visible');
  inputErrorMessage.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const inputErrorMessage = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__person_type_error');
  inputErrorMessage.classList.remove('popup__error_visible');
  inputErrorMessage.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setInputListeners (formElement, formElementsClasses) {
  const inputList = Array.from(formElement.querySelectorAll(formElementsClasses.inputSelector));
  const buttonSubmitElement = formElement.querySelector(formElementsClasses.submitButtonSelector);

  changeButtonState(inputList, buttonSubmitElement);
  
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input);
      changeButtonState(inputList, buttonSubmitElement);
    });
  })
}

function enableValidation(formElementsClasses) {
  const formList = Array.from(document.querySelectorAll(formElementsClasses.formSelector));

  formList.forEach(form => {
    setInputListeners(form, formElementsClasses);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return (!input.validity.valid);
  });
}

function changeButtonState(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.classList.add('popup__submit-button_disabled');
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove('popup__submit-button_disabled');
    button.removeAttribute('disabled');
  }
}

enableValidation(formElementsClasses);
