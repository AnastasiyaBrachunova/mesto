export default class Popup {
  constructor(popupSelector) {
    this.popup = document.getElementById(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    // открывает попап и присваивет слушатель закрытия кнопкой
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    // закрывает попап и убирает слушатель закрытия кнопкой
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    //содержит логику закрытия попапа клавишей Esc.
    if (event.key === "Escape") {
      this.closePopup();
    }
  }

  isContains(element, event) {
    return event.target.classList.contains(element);
  }

  setEventListeners() {
    this.popup.addEventListener("click", (event) => {
      
      if (this.isContains("popup", event) || this.isContains("popup-close", event)) {
        this.closePopup();
      }
    });
  }
}
