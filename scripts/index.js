import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// /*----------Переменные открытие и закрытие попапов----------------*/
const userInfoOpen = document.querySelector(".edit-button");
const userInfoClose = document.getElementById("closeUserInfo");
const popUpUserInfo = document.getElementById("profilePopup");
const profInfo = document.querySelector(".form__input-container_prof-info");
const nameInfo = document.querySelector(".form__input-container_name-info");
const userName = document.querySelector(".profile__name");
const userInfo = document.querySelector(".profile__job");
const trawelInfoOpen = document.getElementById("trawelInfo");
const formUserInfo = document.getElementById("formUserInfo");
const cardButtonAdd = document.querySelector(".add-button");
const trawelCardclose = document.getElementById("closeTravel");
/*---------------Переменные для создание новых карточек-----------------------*/
const cardContainer = document.querySelector(".grid-gallery");
const formTravel = document.getElementById("popUpTravel");
const namePicAdd = document.getElementById("cardInfo");
const urlAdd = document.getElementById("urlInfo");
const picOpen = document.getElementById("zoomPic");
const closePic = document.querySelector(".popup-close_pic");

const photoArray = [
  {
    name: "Коста-Рика",
    link: "./image/Costa_Rica.jpg",
  },
  {
    name: "Греция",
    link: "./image/Greece.jpg",
  },
  {
    name: "Австралия",
    link: "./image/Blue_Mountains_Australia.jpg",
  },
  {
    name: "Индия",
    link: "./image/India1.jpg",
  },
  {
    name: "Франция",
    link: "./image/Isola_france.jpg",
  },
  {
    name: "Рио-де-Жанейро",
    link: "./image/Rio_de_Janeiro.jpg",
  },
];

/*----универсальное открытие и закрытие модальных окон-------*/

function escClose(evt) {
  if (evt.key === "Escape") {
    const popUpOpened = document.querySelector(".popup_opened");
    closeModal(popUpOpened);
  }
}

function openModal(popupId) {
  popupId.classList.add("popup_opened");
  document.addEventListener("keydown", escClose);
}

function closeModal(popupId) {
  popupId.classList.remove("popup_opened");
  document.removeEventListener("keydown", escClose);
}

function overlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}
popUpUserInfo.addEventListener("click", overlayClose);
trawelInfoOpen.addEventListener("click", overlayClose);
picOpen.addEventListener("click", overlayClose);

/*-----------------------------------------------------------*/
function openPropfilePopUp() {
  nameInfo.value = userName.textContent;
  profInfo.value = userInfo.textContent;
  openModal(popUpUserInfo);
}

userInfoOpen.addEventListener("click", () => {
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

cardButtonAdd.addEventListener("click", () => {
  openModal(trawelInfoOpen);
  formTravel.reset();
  formTravelValidation.resetForm();
});
trawelCardclose.addEventListener("click", () => closeModal(trawelInfoOpen));

closePic.addEventListener("click", () => closeModal(picOpen)); //закрыть картинку

/*---------Добавление карточек через кнопку Создать------*/

const addCard = (event) => {
  event.preventDefault();
  const card = new Card(
    { name: namePicAdd.value, link: urlAdd.value },
    ".card-template"
  );
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);

  closeModal(trawelInfoOpen);
};

formTravel.addEventListener("submit", addCard);

//Создание карточек

photoArray.forEach((item) => {
  const card = new Card(item, ".card-template");
  const cardElement = card.generateCard();
  cardContainer.append(cardElement);
  return cardElement;
});

// ВКЛЮЧЕНИЕ ВАЛИДАЦИИ
const formForValidation = {
  form: ".form",
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
