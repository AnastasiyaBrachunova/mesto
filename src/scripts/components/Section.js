export default class Section {
  constructor({ renderer }, containerSelector) {      
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item, position = 'before') {
    if (position === 'before') {
    this._container.prepend(item);
    } else {
      this._container.append(item);
    }
  }

}

