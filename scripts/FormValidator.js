const formElementsClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__person',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__person_type_error',
  errorClass: 'popup__error_visible'
};

function showInputError(classesList, formElement, inputElement, errorMessage) {
  const inputErrorMessage = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(classesList.inputErrorClass);
  inputErrorMessage.classList.add(classesList.errorClass);
  inputErrorMessage.textContent = errorMessage;
}

function hideInputError(classesList, formElement, inputElement) {
  const inputErrorMessage = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(classesList.inputErrorClass);
  inputErrorMessage.classList.remove(classesList.errorClass);
  inputErrorMessage.textContent = '';
}

function checkInputValidity(classesList, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(classesList, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(classesList, formElement, inputElement);
  }
}

function setInputListeners (formElement, classesList) {
  const inputList = Array.from(formElement.querySelectorAll(classesList.inputSelector));
  const buttonSubmitElement = formElement.querySelector(classesList.submitButtonSelector);

  changeButtonState(inputList, buttonSubmitElement, classesList);
  
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(classesList, formElement, input);
      changeButtonState(inputList, buttonSubmitElement, classesList);
    });
  })
}

function enableValidation(classesList) {
  const formList = Array.from(document.querySelectorAll(classesList.formSelector));

  formList.forEach(form => {
    setInputListeners(form, classesList);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return (!input.validity.valid);
  });
}

function changeButtonState(inputList, button, classesList) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(classesList.inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(classesList.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

enableValidation(formElementsClasses);
