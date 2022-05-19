import {renderCard} from './index.js'



export default class Section {

    constructor({item, renderer}, containerSelector){
        this._renderer = renderer;
        this._initialArray = item;   // массив с данными карточек
        this._container = document.querySelector(containerSelector); // CSS-селектор контейнера. В него мы будем вставлять элементы разметки.
    }


     renderer(){
        this._initialArray.forEach((item) => {
            const cardElement = renderCard(item);
            this.addItem(cardElement);
            return cardElement;
          });
     }  //перебирает массив данных _initialArray. Вызывает для каждого элемента массива метод setItem

     addItem(element){
        this._container.append(element);
     } //принимает параметр element? (dom-элемент)и вставляет его в контейнер методом append.

}
