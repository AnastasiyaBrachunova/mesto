import Popup from "./Popup";
export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this.popup.querySelector(".form");
  }

  setSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (event) => {
      evt.preventDefault();
      this._handleFormSubmit(event);
      this.close();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this._handleFormSubmit();
      }
    });
  }
}
