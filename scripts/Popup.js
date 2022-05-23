export default class Popup {
  constructor(formSelector) {
    this.formSelector = formSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    // открывает попап и присваивет слушатель закрытия кнопкой
    this.formSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    // закрывает попап и убирает слушатель закрытия кнопкой
    this.formSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    //содержит логику закрытия попапа клавишей Esc.
    if (event.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this.formSelector.addEventListener("click", (event) => {
      function selector(element) {
        return event.target.classList.contains(element);
      }

      if (selector("popup") || selector("popup-close")) {
        this.closePopup();
      }
    });
  }
}
