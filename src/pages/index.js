import "../pages/index.css";
import Card from "../scripts/components/Card.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

import { FormValidator } from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import {
  photoArray,
  openModalUserButton,
  openModalTravelButton,
  userName,
  userInfo,
  formUserInfo,
  formTravel,
} from "../scripts/utils/constants.js";
import Popup from "../scripts/components/Popup";

/*----универсальное открытие и закрытие модальных окон-------*/

const inputUserInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userJobSelector: ".profile__job",
});

document.querySelector(".edit-button").addEventListener("click", () => {
  popupUserFormSubmit.openPopup();
});
document.querySelector(".add-button").addEventListener("click", () => {
  popupTravelFormSubmit.openPopup();
});

const modalWithImage = new PopupWithImage("zoomPic");
modalWithImage.setEventListeners();

/*---Установка слушателя на сабмит и получение данных из инпутов--*/
const popupUserFormSubmit = new PopupWithForm({
  popupSelector: "profilePopup",
  handleFormSubmit: (formData) => {
    inputUserInfo.setUserInfo(formData);
  },
});
popupUserFormSubmit.setEventListeners();

openModalUserButton.addEventListener("click", () => {
  const getUserInfo = inputUserInfo.getUserInfo();

  formUserInfoValidation.resetForm();
  formUserInfoValidation.enableSubmitButton();
  userName.value = getUserInfo.userName;
  userInfo.value = getUserInfo.profInfo;
});

const popupTravelFormSubmit = new PopupWithForm({
  popupSelector: "trawelInfo",
  handleFormSubmit: (formData) => {
    const dataValue = renderCard(formData);
    cardList.addItem(dataValue);
  },
});
popupTravelFormSubmit.setEventListeners();

openModalTravelButton.addEventListener("click", () => {
  formTravel.reset();
  formTravelValidation.resetForm();
  formTravelValidation.disableSubmitButton();
});


const renderCard = (item) => {
  const card = new Card(item, ".card-template", (name, link) => {
    modalWithImage.openImage(link, name);
  });
  return card.generateCard();
};


//Отрисовывание карточек

const cardList = new Section(
  {
    items: photoArray,
    renderer:  (item) => { // функция для отрисоки 1 элемента называется renderer
      const card = renderCard(item); // переиспользовали функцию создания карточки
      cardList.addItem(card); // вставили в разметку с помощью имеющегося метода класса Section
    },
  },
  ".grid-gallery"
);
cardList.renderItems();

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
