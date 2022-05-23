import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ formSelector, handleFormSubmit }) {
    super(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    // this._formElement = document.querySelector(".popup")

  }

  _getInputValues() {
    this._inputList = document.querySelectorAll('.form__input-container');
    
    this._formValues = {};

    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
    
    return this._formValues;
  } 

   setEventListeners() {
    super.setEventListeners();

    this.formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closePopupForm()
    });
  } 
  

  closePopupForm() {
    super.closePopup();
  }
}

/****************************************************/

// class User