import "../pages/index.css"
import Card from "./components/Card.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

import { FormValidator } from "./components/FormValidator.js";
import Section from "./components/Section.js";
import {
  photoArray,
  openModalUserButton,
  openModalTravelButton,
  cardContainer,
  modalPic,
  modalUserInfo,
  modalTravelInfo,
  userName,
  userInfo,
  formUserInfo,
  formTravel,
} from "./utils/constants.js";

/*----универсальное открытие и закрытие модальных окон-------*/

const popupTravel = new Popup(modalTravelInfo);
const popupUserInfo = new Popup(modalUserInfo);
const popupPic = new Popup(modalPic);
const inputUserInfo = new UserInfo({
  firstSelector: ".form__input-container_name-info",
  secondSelector: ".form__input-container_prof-info",
});

popupTravel.setEventListeners();
popupUserInfo.setEventListeners();
popupPic.setEventListeners();

const handleCardClick = () => {

  const modalWithImage = new PopupWithImage(modalPic);

  const imageCard = document.querySelectorAll(".card__pic");

  imageCard.forEach((item) => {
    item.addEventListener("click", () => {
      modalWithImage.openImage(item.src, item.alt);
    });
  });
};

/*---Установка слушателя на сабмит и получение данных из инпутов--*/

openModalUserButton.addEventListener("click", () => {
  formUserInfoValidation.resetForm();
  formUserInfoValidation.enableSubmitButton();
  popupUserInfo.openPopup();
  inputUserInfo.getUserInfo({
    userName: userName.textContent,
    profInfo: userInfo.textContent,
  });

  const PopupUserFormSubmit = new PopupWithForm({
    formSelector: modalUserInfo,
    handleFormSubmit: (formData) => {
      const dataValue = {
        userName: formData.userName,
        profInfo: formData.profInfo,
      };
      inputUserInfo.setUserInfo(dataValue);
      console.log(inputUserInfo.setUserInfo(dataValue));
    },
  });
  PopupUserFormSubmit.setEventListeners();
});

openModalTravelButton.addEventListener("click", () => {
  formTravel.reset();
  formTravelValidation.resetForm();
  formTravelValidation.disableSubmitButton();
  popupTravel.openPopup();

  const PopupTravelFormSubmit = new PopupWithForm({
    formSelector: modalTravelInfo,
    handleFormSubmit: (formData) => {
      const dataValue = renderCard({
        name: formData.nameCard,
        link: formData.linkImage,
      });
      cardContainer.prepend(dataValue);
    },
  });
  PopupTravelFormSubmit.setEventListeners();
});

/*---------Добавление карточек через кнопку Создать------*/

export const renderCard = (item) => {
  const card = new Card(item, ".card-template", handleCardClick);
  // return card;
  return card.generateCard();
};

//Отрисовывание карточек

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

/******* Управление модальным окном увеличенного изображения****** */
// расположено в конце, потому что если поднять выше - не работает

// const modalWithImage = new PopupWithImage(modalPic);

// const imageCard = document.querySelectorAll(".card__pic");

// imageCard.forEach((item) => {
//   item.addEventListener("click", () => {
//     modalWithImage.openImage(item.src, item.alt);
//   });
// });
