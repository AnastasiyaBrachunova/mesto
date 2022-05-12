export class FormValidator {
  constructor(config) {
    this._formSelector =  document.querySelector(config.form);
    this._formInput = config.formInput;
    this._buttonElement = document.querySelector(config.buttonElement);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._closeButton = config.closeButton;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formSelector.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formSelector.querySelector(
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
    const inputList = Array.from(this._formSelector.querySelectorAll(this._formInput));
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
    const errorInputList = Array.from(
      document.querySelectorAll(".form__input-container")
    );
    const errorlist = Array.from(
      document.querySelectorAll(".form__input-error_active")
    );
    errorlist.forEach((errorElement) => {
      errorElement.classList.remove("form__input-error_active");
      errorElement.textContent = "";
    });
    errorInputList.forEach((inputElement) => {
      inputElement.classList.remove("form__input-container_error");
      inputElement.value = "";
    });
  }

  enableValidation() {
    const formList = Array.from(this._formSelector);
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {});
      this._setEventListeners(formElement);
    });
  }
}
