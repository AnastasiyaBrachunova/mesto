export class FormValidator {
  constructor(config, formElement){
    this._formSelector =  document.querySelector(config.form);
    this._formInput = config.formInput;
    this._buttonElement = document.querySelector(config.buttonElement);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._closeButton = config.closeButton;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else if (inputElement.value === "") {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableSubmitButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton()
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._formInput));
    this._inputList = inputList

    this._toggleButtonState();
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
      });
    });
  };

  resetForm() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
  });
    // const errorInputList = Array.from(
    //   this._formElement.querySelectorAll(this._formInput)
    // );
    // const errorlist = Array.from(
    //   this._formElement.querySelectorAll(this._errorClass)
    // );
    // errorlist.forEach((errorElement) => {
    //   errorElement.classList.remove(this._errorClass);
    //   errorElement.textContent = "";
    // });
    // errorInputList.forEach((inputElement) => {
    //   inputElement.classList.remove(this._inputErrorClass);
    //   inputElement.value = "";
    // });
  }

  enableValidation() {
    const formList = Array.from(this._formElement);
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {});
      this._setEventListeners(formElement);
    });
  }
}
