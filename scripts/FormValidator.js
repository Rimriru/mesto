export { FormValidator, formElementsClasses };

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

  resetInputError() {
    // const formElement = this._formElement;
    // const inputName = formElement.elements.name;
    // const inputDescription = formElement.elements.description;
    // const inputNameErrorMessage = formElement.querySelector(`.${inputName.id}-error`);
    // const inputDescriptionErrorMessage = formElement.querySelector(`.${inputDescription.id}-error`);

    // inputName.classList.remove(this._inputErrorClass);
    // inputDescription.classList.remove(this._inputErrorClass);
    // inputNameErrorMessage.textContent = '';
    // inputNameErrorMessage.classList.remove(this._errorClassActive);
    // inputDescriptionErrorMessage.textContent = '';
    // inputDescriptionErrorMessage.classList.remove(this._errorClassActive);
    this._inputList.forEach(input => {
      this._hideInputError(input);
    });
  }

  _showInputError(inputElement) {
    this._input = inputElement;
    this._errorMessage = this._formElement.querySelector(`.${this._input.id}-error`);

    this._input.classList.add(this._inputErrorClass);
    this._errorMessage.textContent = this._input.validationMessage;
    this._errorMessage.classList.add(this._errorClassActive);
  }

  _hideInputError(inputElement) {
    this._input = inputElement;
    this._errorMessage = this._formElement.querySelector(`.${this._input.id}-error`);

    this._input.classList.remove(this._inputErrorClass);
    this._errorMessage.textContent = '';
    this._errorMessage.classList.remove(this._errorClassActive);
  }

  _checkInputValidity(inputElement) {
    return (!inputElement.validity.valid) ? this._showInputError(inputElement) : this._hideInputError(inputElement);
  }

  _hasInvalidInput() {
    return this._inputList.some(input => {
      return !input.validity.valid;
    });
  }

  disableSubmitButton() {
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
    this._buttonSubmit.setAttribute('disabled', true);
  }

  _enableSubmitButton() {
    this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    this._buttonSubmit.removeAttribute('disabled');
  }

  _changeButtonState() {
    return this._hasInvalidInput() ? this.disableSubmitButton() : this._enableSubmitButton();
  }

  _setInputListeners(inputElement) {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._changeButtonState();
    });
  }

  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);

    this._changeButtonState();

    this._inputList.forEach(input => {
      this._setInputListeners(input);
    });
  }
}

