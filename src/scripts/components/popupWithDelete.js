import Popup from "./Popup";
export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this.popup.querySelector(".form");
  }

  setSubmit(handleFormSubmit) {
    this._handler = handleFormSubmit;
  }

  setEventListeners() {

    this._popupForm.addEventListener("submit", (event) => {
      super.setEventListeners();
      evt.preventDefault();
      this._handler(event);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this._handleFormSubmit();
      }
    });
  }
}
