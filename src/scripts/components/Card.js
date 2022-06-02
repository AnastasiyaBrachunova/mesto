export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this._card = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  handleCardClick() {
    this._card.addEventListener("click", () =>
      openImage(this._card.textContent, this._card.src)
    );
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

  _setEventListeners() {
    this._buttonLike = this._card.querySelector(".button-like");

    this._buttonLike.addEventListener("click", () => {
      this._cardLike();
    });

    this._card.querySelector(".card__delete").addEventListener("click", () => {
      this._cardDelete();
    });

    this._card
      .querySelector(".card__pic")
      .addEventListener("click", () =>
        this.handleCardClick(this._name, this._link)
      );
  }
}
