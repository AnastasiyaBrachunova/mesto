export default class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeleteClick },
    cardSelector,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    // создание карточки
    this._element = this._getTemplate(); // то что вернули - кард элемент
    this._picture = this._element.querySelector(".card__pic"); // нашли изображение
    this._likeСounter = this._element.querySelector(".card__count-likes"); // нашли счетчик лайков

    this._picture.src = this._link; // присвоили ссылку
    this._picture.alt = this._name; // присвоили значение в альт для большой картинки
    this._element.querySelector(".card__caption").textContent = this._name; // присвоили имя  картинки для карточки
    this._likeСounter.textContent = this._likes.length; // присвоили значение счетчика его длину из сервера

    this._buttonLike = this._element.querySelector(".button-like"); // нашли кнопку лайка
    this._trashCanButton = this._element.querySelector(".card__delete"); // нашли кнопку корзины
    this._switchLike(); // запустили переключатель состояния лайка
    this._swithTrashCan(); // запустили переключатель корзины
    this._setEventListeners(); // запустили слушатели

    return this._element; // вернули элемент карточки
  }

  getCardId() {
    // получили айдишник с сервера
    return this._id;
  }

  whoLikes(like) {
    // получаем количество лайков
    // console.log(like)
    return this._likes.some((like) => like._id === this._userId)
  }

  cardDelete() { 
    this._element.remove(); 
    this._element = null; 
  }


  _switchLike() {
    // переключатель лайков
    if (this.whoLikes()) {
      // если кто-то лайкнул то актив
      this._buttonLike.classList.add("button-like_active");
    } else {
      // иначе убрать
      this._buttonLike.classList.remove("button-like_active");
    }
  }

  counterLikes(likesLength) {
    // записали значение счетчика
    this._likeСounter.textContent = likesLength;
  }

  cardLikeToggle() {
    this._buttonLike.classList.toggle("button-like_active");
  }

  _swithTrashCan() {
    // переключатель состояния корзины
    if (this._userId !== this._owner._id) {
    
      // если хозяин картинки не я, то скрыть значок
      this._trashCanButton.classList.add("card__delete_hidden");
    } else {
      // иначе показать
      this._trashCanButton.classList.remove("card__delete_hidden");
    }
  }

  _setEventListeners() {
    //набор слушателей

    this._trashCanButton.addEventListener("click", (event) => {
      this.handleDeleteClick(event);
    });

    this._buttonLike.addEventListener("click", () => {
      this.handleLikeClick(this);
    });

    this._picture.addEventListener("click", () =>
      this.handleCardClick(this._name, this._link)
    );
  }
}
