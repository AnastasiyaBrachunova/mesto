class Card {
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

  _setEventListeners() {
    this._card.querySelector(".button-like").addEventListener("click", () => {
      this._cardLike();
    });

    this._card.querySelector(".card__delete").addEventListener("click", () => {
      this._cardDelete();
    });

    this._card.querySelector(".card__pic").addEventListener("click", () => {
      this._cardZoom();
    });
  }

  _cardLike() {
    this._card
      .querySelector(".button-like")
      .classList.toggle("button-like_active");
  }

  _cardDelete() {
    this._card.remove();
  }

  _cardZoom() {
    captureZoom.textContent = this._name;
    picZoom.src = this._link;
    picZoom.alt = this._name;
    openModal(picOpen);
  }
}

photoArray.forEach((item) => {
  const card = new Card(item, ".card-template");
  const cardElement = card.generateCard();

  document.querySelector(".grid-gallery").append(cardElement);
});
