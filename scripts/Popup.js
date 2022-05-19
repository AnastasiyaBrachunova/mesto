import { modalUserButton, modalTravelButton } from "./utils/constants.js";


export default class Popup {
  constructor(formSelector) {
    this.formSelector = formSelector;
  }



  openPopup() {  // открывает попап и присваивет слушатель закрытия кнопкой
    this.formSelector.classList.add("popup_opened");
    document.addEventListener("keydown", () => {
      this._handleEscClose();
    });
  }

  closePopup() { // закрывает попап и убирает слушатель закрытия кнопкой
    this.formSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", () => {
      this._handleEscClose();
    });
  }

  overlayClose(evt) { // закрытие через оверлэй
    if (evt.target === evt.currentTarget) {
      this.close(evt.target);
    }
  }

  _handleEscClose(evt) { //содержит логику закрытия попапа клавишей Esc.
    if (evt.key === "Escape") {
      const popUpOpened = document.querySelector(".popup_opened");
      this.close(popUpOpened);
    }
  } 

  setEventListeners() { 
    this.formSelector.addEventListener("click", () => {
        this.overlayClose()
    });
    modalUserButton.addEventListener("click", () => {
        this.openPopup()
    });

    modalTravelButton.addEventListener("click", () => {
      this.openPopup()
  });

  this.formSelector.querySelector("popup-close").addEventListener("click", () => {
        this.closePopup()
    });


  } 
}

/********************************************************************** */

import { modalUserButton, modalTravelButton } from "./utils/constants.js";

class PopupWithImage extends Popup {  // использует любые методы Popup 
  constructor(formSelector, data) {
    super(formSelector);
    this._name = data.name;
    this._link = data.link;
  }
  openPopupImage() {
    this.formSelector.querySelector(".popup__capture").textContent = this._name;
    const zoomImage = this.formSelector.document.querySelector(".popup__zoom-pic")
    zoomImage.src = this._link;
    zoomImage.alt = this._name;
    super.openPopup(formSelector);
  } 
}
/********************************************************************** */

class PopupWithImage extends Popup{
  constructor(formSelector, /*колбэк сабмита формы*/) {
    super(formSelector);
  }

  _getInputValues(){}

  setEventListeners(){} // перезапись родительского метода  
  //должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.

  closePopup(){
    super.openPopup(formSelector);
    this.formSelector.reset(); // или 

  } // перезапись, форма должна ещё и сбрасываться.

}