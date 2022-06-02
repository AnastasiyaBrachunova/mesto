export default class Section {
  constructor({ items, renderItems }, containerSelector) {
    this._renderItems = renderItems;
    this._initialArray = items; // массив с данными карточек
    this._container = document.querySelector(containerSelector); // CSS-селектор контейнера. В него мы будем вставлять элементы разметки.
  }

  renderer() {
    this._initialArray.forEach((item) => {
      const cardElement = this._renderItems(item);
      this.addItem(cardElement);
      return cardElement;
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
