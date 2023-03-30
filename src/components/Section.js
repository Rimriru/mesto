export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(data, isUser) {
    data.forEach(item => {
      this._container.append(this._renderer(item, isUser));
    });
  }
}