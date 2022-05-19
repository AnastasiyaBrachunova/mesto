import { openModal } from "./index.js";
// import Popup from "./Popup.js";

// const popup = new Popup (formSelector);



export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._card = document.querySelector(this._cardSelector).content
      .querySelector(".card")
      .cloneNode(true);
  }

  generateCard() {
    this._setEventListeners();
    this._card.querySelector(".card__caption").textContent = this._name;
    this._card.querySelector(".card__pic").src = this._link;
    this._card.querySelector(".card__pic").alt = this._name;

    return this._card;
  }

  _cardLike() {
    this._buttonLike.classList.toggle("button-like_active");
  }

  _cardDelete() {
    this._card.remove();
    this._card = null;
  }

  _openModalPic() {
    const captureZoom = document.querySelector(".popup__capture");
    const picZoom = document.querySelector(".popup__zoom-pic");
    const picOpen = document.getElementById("zoomPic");
    captureZoom.textContent = this._name;
    picZoom.src = this._link;
    picZoom.alt = this._name;
    openModal(picOpen); // ТУТ НАДО ПОДУМАТЬ КАК ВЫЗВАТЬ МЕТОД ДРУГОЙ ФУНКЦИИ ВНУТРИ КЛАССА, ЛИБО ЕГО ВООБЩЕ УДАЛИТЬ 
  }

  _setEventListeners() {
    this._buttonLike = this._card.querySelector(".button-like");
    this._buttonLike.addEventListener("click", () => {
      this._cardLike();
    });

    this._card.querySelector(".card__delete").addEventListener("click", () => {
      this._cardDelete();
    });

    this._card.querySelector(".card__pic").addEventListener("click", () => {
      this._openModalPic();
    });
  }
}
