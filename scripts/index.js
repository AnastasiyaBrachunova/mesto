import Card from './Card.js';

// /*----------Переменные открытие и закрытие попапов----------------*/
const userInfoOpen = document.querySelector(".edit-button");
const userInfoClose = document.getElementById("closeUserInfo");
const popUpUserInfo = document.getElementById("profilePopup");
const profInfo = document.querySelector(".form__input-container_prof-info");
const nameInfo = document.querySelector(".form__input-container_name-info");
const userName = document.querySelector(".profile__name");
const userInfo = document.querySelector(".profile__job");
const trawelInfoOpen = document.getElementById("trawelInfo");
const formUserInfo= document.getElementById("formUserInfo");
const cardButtonAdd = document.querySelector(".add-button");
const trawelCardclose = document.getElementById("closeTravel"); 
/*---------------Переменные для создание новых карточек-----------------------*/
const template = document.getElementById("card-template");
const cardContainer = document.querySelector(".grid-gallery");
const formTravel = document.getElementById("popUpTravel");
const namePicAdd = document.getElementById("cardInfo");
const urlAdd = document.getElementById("urlInfo");
const picOpen = document.getElementById("zoomPic");
// const picZoom = document.querySelector(".popup__zoom-pic");
// const captureZoom = document.querySelector(".popup__capture");
const closePic = document.querySelector(".popup-close_pic");
// const popUpOpened = document.querySelector(".popup_opened");
// const travelSubmit = document.querySelector(".form__button-submit");
// const modalClose = document.querySelector('.popup-close');
// const cardFormSubmitButton = document.querySelector('.form__button-submit_travel');



/*----универсальное открытие и закрытие модальных окон-------*/

function escClose(evt){
  if (evt.key === "Escape") {
    const popUpOpened = document.querySelector(".popup_opened");
     closeModal(popUpOpened);
   } 
 }

 function openModal(popupId) {
  popupId.classList.add("popup_opened");
  document.addEventListener("keydown",  escClose);
 }

 function closeModal(popupId) {
   popupId.classList.remove("popup_opened");
  document.removeEventListener("keydown",  escClose);
}

function overlayClose(evt){
  if(evt.target === evt.currentTarget) {
    closeModal(evt.target)
    }
}
popUpUserInfo.addEventListener("click", overlayClose);
trawelInfoOpen.addEventListener("click", overlayClose);
picOpen.addEventListener("click", overlayClose);


/*-----------------------------------------------------------*/
function openPropfilePopUp(){
  nameInfo.value = userName.textContent;
  profInfo.value = userInfo.textContent;
  openModal(popUpUserInfo);
}

userInfoOpen.addEventListener("click", () => {
  // resetForm();
  openPropfilePopUp();
});

userInfoClose.addEventListener("click", () => {
  closeModal(popUpUserInfo);
});

/*------ заполнение информации пользователя и отправка формы---------------- */
const formUserInfoSubmit = document.getElementById("formUserInfo");

function saveInfoModal() {
  userName.textContent = nameInfo.value;
  userInfo.textContent = profInfo.value;
}

formUserInfoSubmit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  saveInfoModal();
  closeModal(popUpUserInfo);
});

/*-------вкл/выкл попап добавления картинок----------*/

cardButtonAdd.addEventListener("click", () => {
  openModal(trawelInfoOpen);
  // resetForm();
});
trawelCardclose.addEventListener("click", () => closeModal(trawelInfoOpen));

// function openModalPic(card) { // открыть картинку
//   captureZoom.textContent = card.name;
//   picZoom.src = card.link;
//   picZoom.alt = card.name;
//   openModal(picOpen);

// } 
closePic.addEventListener("click", () => closeModal(picOpen)); //закрыть картинку

// const creatBlock = (card) => { // создание картинок
//   const task = template.content.querySelector(".card").cloneNode(true);
//   const cardPic = task.querySelector('.card__pic');
//   task.querySelector(".card__caption").textContent = card.name;
//   cardPic.src = card.link;
//   cardPic.alt = card.name;

//   task.querySelector(".card__delete").addEventListener("click", () => {
//     task.remove();
//   }); // слушатель удаления карточки

//   task.querySelector(".button-like").addEventListener("click", (evt) => {
//     evt.target.classList.toggle("button-like_active");
//   }); // слушатель лайка

//   // вкл/выкл большое изображение
//   cardPic.addEventListener("click", () => openModalPic(card));

//   return task;
// };

// const renderCard = (card) => {
//   cardContainer.prepend(Card.this.creatBlock(card));
// };



/*---------Добавление карточек через кнопку Создать------*/


const addCard = (event) => {
  event.preventDefault(); 
  const card = new Card( ".card-template");
  const cardElement = card.renderCArd();
  cardContainer.prepend(cardElement); 

  closeModal(trawelInfoOpen) 
};



// cardContainer.append(...elements);
formTravel.addEventListener("submit", addCard);



//Создание карточек 



photoArray.forEach((item) => {
  const card = new Card(item, ".card-template");
  const cardElement = card.generateCard();
  cardContainer.append(cardElement);
  return cardElement;

});

// const elements = photoArray.map((card) => {
//   return this.creatBlock(card);
// });

// ВКЛЮЧЕНИЕ ВАЛИДАЦИИ

import {FormValidator} from './FormValidator.js';


const formForValidation = {
  form: '.form',
  formInput: '.form__input-container',
  buttonElement: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_invalid',
  inputErrorClass: 'form__input-container_error"',
  errorClass: 'form__input-error_active',
  closeButton: '.popup-close',
}


const formUserInfoValidation = new FormValidator(formForValidation, formUserInfo);
formUserInfoValidation.enableValidation();

const formTravelValidation = new FormValidator(formForValidation, formTravel)
formTravelValidation.enableValidation();



 