import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this.popup.querySelectorAll(".form__input-container");
    this._form = this.popup.querySelector(".form");
    this._submitButton = this._form.querySelector(".form__button-submit");
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
  setLoader(isLoading){
    if(isLoading){
      this._submitButton.textContent = "Сохранение..."
    } else {
      this._submitButton.textContent = this._submitButton.value
    }

  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // this.closePopupForm();
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  openPopup(){
    super.openPopup();
  }
}
