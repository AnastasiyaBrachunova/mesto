import Popup from "./Popup.js";
import { captureModalPic, imageModalPic } from "./utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(formSelector) {
    super(formSelector);
  }

  openPopupImage(src, alt) {
    super.openPopup();
    captureModalPic.textContent = alt;
    imageModalPic.src = src;
    imageModalPic.alt = alt;
  }
}
