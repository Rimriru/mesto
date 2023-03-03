export {FormValidator};

const formElementsClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__person',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__person_type_error',
  errorClassActive: 'popup__error_visible'
};


class FormValidator {
  constructor(selectorsList, formElement) {
    this._formSelector = selectorsList.formSelector;
    this._inputSelector = selectorsList.inputSelector;
    this._submitButtonSelector = selectorsList.submitButtonSelector;
    this._inactiveButtonClass = selectorsList.inactiveButtonClass;
    this._inputErrorClass = selectorsList.inputErrorClass;
    this._errorClassActive = selectorsList.errorClassActive;
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    this._errorMessage = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    this._errorMessage.textContent = inputElement.validationMessage;
    this._errorMessage.classList.add(this._errorClassActive);
  }

  _hideInputError(inputElement) {
    this._errorMessage = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    this._errorMessage.textContent = '';
    this._errorMessage.classList.remove(this._errorClassActive);
  }

  _checkInputValidity(inputElement) {
    return !inputElement.validity.valid ? this._showInputError(inputElement) : this._hideInputError(inputElement);
  }

  _setInputListeners(inputElement) {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
    });
  }

  enableValidation() {
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    this._inputList.forEach(input => {
      this._setInputListeners(input);
    });
  }
}


// function showInputError(classesList, formElement, inputElement, errorMessage) {
//   const inputErrorMessage = formElement.querySelector(`.${inputElement.id}-error`);

//   inputElement.classList.add(classesList.inputErrorClass);
//   inputErrorMessage.classList.add(classesList.errorClass);
//   inputErrorMessage.textContent = errorMessage;
// }

// function hideInputError(classesList, formElement, inputElement) {
//   const inputErrorMessage = formElement.querySelector(`.${inputElement.id}-error`);

//   inputElement.classList.remove(classesList.inputErrorClass);
//   inputErrorMessage.classList.remove(classesList.errorClass);
//   inputErrorMessage.textContent = '';
// }

// function checkInputValidity(classesList, formElement, inputElement) {
//   if (!inputElement.validity.valid) {
//     showInputError(classesList, formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(classesList, formElement, inputElement);
//   }
// }

// function setInputListeners (formElement, classesList) {
//   const inputList = Array.from(formElement.querySelectorAll(classesList.inputSelector));
//   const buttonSubmitElement = formElement.querySelector(classesList.submitButtonSelector);

//   changeButtonState(inputList, buttonSubmitElement, classesList);
  
//   inputList.forEach(input => {
//     input.addEventListener('input', () => {
//       checkInputValidity(classesList, formElement, input);
//       changeButtonState(inputList, buttonSubmitElement, classesList);
//     });
//   })
// }

// function enableValidation(classesList) {
//   const formList = Array.from(document.querySelectorAll(classesList.formSelector));

//   formList.forEach(form => {
//     setInputListeners(form, classesList);
//   });
// }

// function hasInvalidInput(inputList) {
//   return inputList.some(input => {
//     return (!input.validity.valid);
//   });
// }

// function changeButtonState(inputList, button, classesList) {
//   if (hasInvalidInput(inputList)) {
//     button.classList.add(classesList.inactiveButtonClass);
//     button.setAttribute('disabled', true);
//   } else {
//     button.classList.remove(classesList.inactiveButtonClass);
//     button.removeAttribute('disabled');
//   }
// }

// enableValidation(formElementsClasses);
