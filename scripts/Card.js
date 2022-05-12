export default  class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector(".card__caption").textContent = this._name;
    this._card.querySelector(".card__pic").src = this._link;

    return this._card;
  }

  _cardLike() {
    this._card.querySelector(".button-like").classList.toggle("button-like_active");
  }

  _cardDelete() {
    this._card.remove();
  }

  _openModal(popupId) {
    popupId.classList.add("popup_opened");
   }
   _closeModal(popupId) {
    popupId.classList.remove("popup_opened");
 }


  _openModalPic() {
    const captureZoom = document.querySelector(".popup__capture");
    const picZoom = document.querySelector(".popup__zoom-pic");
    const picOpen = document.getElementById("zoomPic");
    captureZoom.textContent = this._name;
    picZoom.src = this._link;
    picZoom.alt = this._name;
    this._openModal(picOpen);
  }

  _setEventListeners() {
    this._card.querySelector(".button-like").addEventListener("click", () => {
      this._cardLike();
    });

    this._card.querySelector(".card__delete").addEventListener("click", () => {
      this._cardDelete();
    });

    this._card.querySelector(".card__pic").addEventListener("click", () => {
      this._openModalPic();
    });
  }

  creatBlock () { // создание картинок
    this._getTemplate();
    this._card.querySelector('.card__pic').src = data.link;
    this._card.querySelector(".card__caption").textContent = data.name;
    cardPic.src = data.link;
    this._card.querySelector('.card__pic').alt = data.name;
    this._setEventListeners();
  };

  // renderCard () {
  //   document.querySelector('.grid-gallery').prepend(this.creatBlock());
  // };



}


