import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import { photoArray } from "./utils/constants.js";
// import Popup from "./Popup.js";


// /*----------Переменные открытие и закрытие попапов----------------*/
const modalUserButton = document.querySelector(".edit-button");
const modalTravelButton = document.querySelector(".add-button");
const userInfoClose = document.getElementById("closeUserInfo");
const popUpUserInfo = document.getElementById("profilePopup");
const profInfo = document.querySelector(".form__input-container_prof-info");
const nameInfo = document.querySelector(".form__input-container_name-info");
const userName = document.querySelector(".profile__name");
const userInfo = document.querySelector(".profile__job");
const trawelInfoOpen = document.getElementById("trawelInfo");
const formUserInfo = document.getElementById("formUserInfo");
const trawelCardclose = document.getElementById("closeTravel");
/*---------------Переменные для создание новых карточек-----------------------*/
const cardContainer = document.querySelector(".grid-gallery");
const formTravel = document.getElementById("popUpTravel");
const namePicAdd = document.getElementById("cardInfo");
const urlAdd = document.getElementById("urlInfo");
const picOpen = document.getElementById("modalPic");
const closePic = document.querySelector(".popup-close_pic");

/*----универсальное открытие и закрытие модальных окон-------*/

// const popup = new Popup (formSelector);






// @@@@@@@    function escClose(evt) {
//   if (evt.key === "Escape") {
//     const popUpOpened = document.querySelector(".popup_opened");
//     closeModal(popUpOpened);
//   }
// }

// export function openModal(popupId) {
//   popupId.classList.add("popup_opened");
//   document.addEventListener("keydown", escClose);
// }

// function closeModal(popupId) {
//   popupId.classList.remove("popup_opened");
//   document.removeEventListener("keydown", escClose);
// }

// function overlayClose(evt) {
//   if (evt.target === evt.currentTarget) {
//     closeModal(evt.target);
//   }
// }  ЭТО Я ПЕРЕНЕСЛА В КЛАСС POPUP @@@@@@


popUpUserInfo.addEventListener("click", overlayClose);
trawelInfoOpen.addEventListener("click", overlayClose);
picOpen.addEventListener("click", overlayClose);

/*-----------------------------------------------------------*/
function openPropfilePopUp() {
  nameInfo.value = userName.textContent;
  profInfo.value = userInfo.textContent;
  openModal(popUpUserInfo);
}

modalUserButton.addEventListener("click", () => {
  formUserInfoValidation.resetForm();
  formUserInfoValidation.enableSubmitButton();
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

modalTravelButton.addEventListener("click", () => {
  formTravel.reset();
  formTravelValidation.resetForm();
  formTravelValidation.disableSubmitButton();
  openModal(trawelInfoOpen);
});

trawelCardclose.addEventListener("click", () => closeModal(trawelInfoOpen));

closePic.addEventListener("click", () => closeModal(picOpen)); //закрыть картинку

/*---------Добавление карточек через кнопку Создать------*/

export const renderCard = (item) => {
  const card = new Card(item, ".card-template");
  return card.generateCard();
};

const addCard = (event) => {
  event.preventDefault();
  const cardElement = renderCard({
    name: namePicAdd.value,
    link: urlAdd.value,
  });
  cardContainer.prepend(cardElement);
  closeModal(trawelInfoOpen);
};

formTravel.addEventListener("submit", addCard);

//Создание карточек

const cardList = new Section(
  {
    item: photoArray,
  },
  ".grid-gallery"
);

cardList.renderer();

// ВКЛЮЧЕНИЕ ВАЛИДАЦИИ
const formForValidation = {
  formInput: ".form__input-container",
  buttonElement: ".form__button-submit",
  inactiveButtonClass: "form__button-submit_invalid",
  inputErrorClass: 'form__input-container_error"',
  errorClass: "form__input-error_active",
  closeButton: ".popup-close",
};

const formUserInfoValidation = new FormValidator(
  formForValidation,
  formUserInfo
);
formUserInfoValidation.enableValidation();

const formTravelValidation = new FormValidator(formForValidation, formTravel);
formTravelValidation.enableValidation();
