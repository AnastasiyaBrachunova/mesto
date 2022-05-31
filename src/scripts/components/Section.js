import {renderCard} from '../index.js'



export default class Section {

    constructor({items, renderer}, containerSelector){
        this._renderer = renderer;
        this._initialArray = items;   // массив с данными карточек
        this._container = document.querySelector(containerSelector); // CSS-селектор контейнера. В него мы будем вставлять элементы разметки.
    }

     renderer(){
        // this._container.innerHTML ='';
        this._initialArray.forEach((item) => {
            const cardElement = this._renderer(item);
            this.addItem(cardElement)
            return cardElement;
          });
     } 

     addItem(item) {
        this._container.prepend(item)
     }
}
