
/*----------открытие и закрытие попапа----------------*/
const openPopUp = document.querySelector('.edit-button');
const closePopUp = document.querySelector('.popup-close');
const popUp = document.querySelector('.popup');
const profInfo = document.querySelector('.form__input-container_prof-info');
const nameInfo = document.querySelector('.form__input-container_name-info');
let userName = document.querySelector('.profile__name');
let userInfo = document.querySelector('.profile__job');

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

const submitButton = document.querySelector('.form__button-submit');

function saveInfoModal (){
  userName.textContent = nameInfo.value
  userInfo.textContent = profInfo.value
}

submitForm.addEventListener('click', () => saveInfoModal())

/*-------ДОБАВЛЕНИЕ КАРТИНОК---------*/



const openTrawelInfo = document.getElementById('trawelInfo');
const addCardButton = document.querySelector('.add-button');
const closeTrawelCard = document.getElementById('closeTravel');

/*-------Попап добавления картинок----------*/

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

/*----------Лайк (постаить после создания карточек)

const buttonLike = document.querySelector('.button-like');

function switchLike(evt){
  evt.target.classList.toggle('button-like');
  evt.target.classList.toggle('button-like_active');
};

buttonLike.addEventListener('click',(evt) => switchLike(evt));*/


/*---------------Создание новых карточек-----------------------*/
let nameCard = document.getElementById('nameCard');
let urlInfo = document.getElementById('urlInfo');
let newNameCard = document.querySelector('.card__caption');
let newUrlInfo = document.querySelector('.card__pic');

const photoArray = [
  {name: 'Карачевск', src:'./image/карачаевск.jpg'}, 
  {name: 'Эльбрус', src:'./image/Эльбрус.png'},
  {name: 'Домбай', src:'./image/домбай.png'},
  {name: 'Гора Эльбрус', src:'./image/Эльбрус.png'},
  {name: 'Домбай', src:'./image/домбай.png'},
  {name: 'Карачаево-Черкессия', src:'./image/карачаевск.jpg'},
];


const cardContainer = document.querySelector('.grid-gallery');


  const createCard = (taskName) => {
    const newCard = document.createElement('li');
    newCard.classList.add('card')

    let cardPic = document.createElement('img');
    cardPic.classList.add('card__pic');
    cardPic.src = taskName.src

    const cardDelete = document.createElement('button');
    cardDelete.classList.add('card__delete');
    cardDelete.classList.add('button');

    const cardItem = document.createElement('div');
    cardItem.classList.add('card__item');

    let cardCaption = document.createElement('h2');
    cardCaption.classList.add('card__caption');
    cardCaption.textContent = taskName.name

    const buttonLike = document.createElement('button');
    buttonLike.classList.add('button-like');
    buttonLike.classList.add('button');

    newCard.append(cardPic, cardDelete, cardItem);
    cardItem.append(cardCaption, buttonLike);

    return newCard;
  }

  const elements = photoArray.map(function(taskName) {
    return createCard(taskName);
  });


 cardContainer.append(...elements)



/*---------Добавление карточек через кнопку Создать-------*/
const creatCard = document.getElementById('creatCard');

creatCard.addEventListener('click', () => addCard());













