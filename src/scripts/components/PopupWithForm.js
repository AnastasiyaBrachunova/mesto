import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this.popup.querySelector(".form")

  }

  _getInputValues() {
    this._inputList = this.popup.querySelectorAll('.form__input-container');
    
    this._formValues = {};

    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
    
    return this._formValues;
  } 

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closePopupForm()
    });
    // document.querySelector('.edit-button').addEventListener('click', () => {
    //   super.openPopup();
    // });
    // document.querySelector('.add-button').addEventListener('click', () => {
    //   super.openPopup();
    // });


  } 
  

  closePopupForm() {
    super.closePopup();
  }
}

