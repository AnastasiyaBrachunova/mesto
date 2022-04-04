
/*----------Переменные открытие и закрытие попапов----------------*/
const openPopUp = document.querySelector('.edit-button');
const closePopUp = document.querySelector('.popup-close');
const popUp = document.querySelector('.popup');
const profInfo = document.querySelector('.form__input-container_prof-info');
const nameInfo = document.querySelector('.form__input-container_name-info');
let userName = document.querySelector('.profile__name');
let userInfo = document.querySelector('.profile__job');
const submitButton = document.querySelector('.form__button-submit');
const openTrawelInfo = document.getElementById('trawelInfo');
const addCardButton = document.querySelector('.add-button');
const closeTrawelCard = document.getElementById('closeTravel');


function openModal () {
    popUp.classList.add('open');
    nameInfo.value = userName.textContent
    profInfo.value = userInfo.textContent
}

function closeModal () {
  popUp.classList.remove('open');
}

openPopUp.addEventListener('click', () => openModal());

closePopUp.addEventListener('click', () => closeModal())

document.addEventListener('keydown', (e) => {
	if( e.key === "Escape" ){ 
       closeModal();
	}
});

/*------ отправка формы---------------- */
let submitForm = document.querySelector('.form');
 
submitForm.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  closeModal();})

/*---------заполнение информации пользователя-------------*/

function saveInfoModal (){
  userName.textContent = nameInfo.value
  userInfo.textContent = profInfo.value
}

submitForm.addEventListener('click', () => saveInfoModal())

/*-------вкл/выкл попап добавления картинок----------*/

function openModalTrawelCard(){
  openTrawelInfo.classList.add('open');
};

function closeModalTrawelCard(){
  openTrawelInfo.classList.remove('open');
};

document.addEventListener('keydown', (e) => {
	if( e.key === "Escape" ){ 
    closeModalTrawelCard();
	}
});

addCardButton.addEventListener('click', () => openModalTrawelCard());
closeTrawelCard.addEventListener('click', () => closeModalTrawelCard());


/*---------------Переменные для создание новых карточек-----------------------*/
let newNameCard = document.querySelector('.card__caption');
let newUrlInfo = document.querySelector('.card__pic');
const cardContainer = document.querySelector('.grid-gallery');
const formTravel = document.getElementById('popUpTravel');
let creatCard = document.getElementById('creatCard');
let addNamePic = document.getElementById('cardInfo');
let addUrl = document.getElementById('urlInfo');
let taskNameCard = document.querySelector ('.card__caption');
let taskUrlInfo = document.querySelector ('.card__pic');
const subFormTravel = document.getElementById('creatCard')
const openPic = document.getElementById('zoomPic');
const smallPic = document.querySelector ('.card_smallPic');
const closePic = document.getElementById('closePic');
const zoomPic = document.querySelector('.popup__zoom-pic');
const zoomCapture = document.querySelector('.popup__capture');



const photoArray = [
  {name: 'Коста-Рика', src:'./image/Costa_Rica.jpg'}, 
  {name: 'Греция', src:'./image/Greece.jpg'},
  {name: 'Австралия', src:'./image/Blue_Mountains_Australia.jpg'},
  {name: 'Индия', src:'./image/India1.jpg'},
  {name: 'Франция', src:'./image/Isola_france.jpg'},
  {name: 'Рио-де-Жанейро', src:'./image/Rio_de_Janeiro.jpg'},
];

function openModalPic (card){
  openPic.classList.add('open');
  zoomCapture.textContent = card.name;
  zoomPic.src = card.src;
} // открыть картинку

function closeModalPic (){
  openPic.classList.remove('open');
} // закрыть картинку

const creatBlock = (card) =>{
    const template = document.getElementById('card-template');
    const task = template.content.querySelector('.card').cloneNode(true);
    task.querySelector('.card__caption').textContent = card.name;
    task.querySelector('.card__pic').src = card.src;
    task.querySelector('.card__pic').alt = card.name;

    task.querySelector('.card__delete').addEventListener('click', () => {
      task.remove();
    });  // слушатель удаления карточки

    task.querySelector('.button-like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('button-like');
      evt.target.classList.toggle('button-like_active');;
    }); // слушатель лайка

    //вкл/выкл большое изображение
    task.querySelector('.card_smallPic').addEventListener('click', () => openModalPic(card));
    const closePic = document.querySelector('.popup-close_pic').addEventListener('click', () => closeModalPic ());

    return task
  }

  const renderCard = (card) => {
    cardContainer.prepend(creatBlock(card));
  };

  const elements = photoArray.map((card) => {
    return creatBlock(card);
  });

/*---------Добавление карточек через кнопку Создать------*/

const addCard = (event) => {
  event.preventDefault();
  const card = {name: addNamePic.value, src: addUrl.value};
  renderCard(card);
  addNamePic.value = '';
  addUrl.value = '';
  closeModalTrawelCard()
};

cardContainer.append(...elements);
formTravel.addEventListener('submit', addCard);




























