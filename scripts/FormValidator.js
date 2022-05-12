export class FormValidator {
  constructor(config, formElement) {
    this._formInput = config.formInput;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(config.buttonElement);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._formInput));
  }

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
    if (!inputElement.validity.valid || inputElement.value === "") {
      this._showInputError(inputElement, inputElement.validationMessage);
    }  else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableSubmitButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
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
      this._formElement.addEventListener("submit", (evt) => {});
      this._setEventListeners(this._formElement);
    
  }
}
