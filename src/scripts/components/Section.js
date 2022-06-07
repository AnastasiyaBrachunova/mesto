export default class Section {
  constructor({ items, renderer }, containerSelector) {      
    this._renderer = renderer;
    this._initialArray = items;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.append(item);
  }

}

