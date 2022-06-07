import Popup from "./Popup.js";
// import { captureModalPic, imageModalPic } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._captureModalPic = this.popup.querySelector(".popup__capture");
    this._imageModalPic = document.querySelector(".popup__zoom-pic");
  }

  openPopup(src, alt) {
    super.openPopup();
    this._captureModalPic.textContent = alt;
    this._imageModalPic.src = src;
    this._imageModalPic.alt = alt;
  }
}
