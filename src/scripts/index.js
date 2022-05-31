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

const popupPic = new Popup(modalPic);
popupPic.setEventListeners();

const inputUserInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userJobSelector: ".profile__job",
});

    document.querySelector('.edit-button').addEventListener('click', () => {
popupUserFormSubmit.openPopup();
    });
    document.querySelector('.add-button').addEventListener('click', () => {
      popupTravelFormSubmit.openPopup();
      });

const modalWithImage = new PopupWithImage(modalPic);

/*---Установка слушателя на сабмит и получение данных из инпутов--*/
const popupUserFormSubmit = new PopupWithForm({
    popupSelector: modalUserInfo,
    handleFormSubmit: (formData) => {
      inputUserInfo.setUserInfo(formData)
      const dataValue = {
        userName: formData.userName,
        profInfo: formData.profInfo,
      };
      inputUserInfo.setUserInfo(dataValue);
    },
  });
popupUserFormSubmit.setEventListeners();


openModalUserButton.addEventListener("click", () => {
  formUserInfoValidation.resetForm();
  formUserInfoValidation.enableSubmitButton();
  userName.value = inputUserInfo.getUserInfo().userName;
  userInfo.value = inputUserInfo.getUserInfo().profInfo;
}); 


const popupTravelFormSubmit = new PopupWithForm({
    popupSelector: modalTravelInfo,
    handleFormSubmit: (formData) => {
      const dataValue = renderCard({
        name: formData.nameCard,
        link: formData.linkImage,
      });
      cardList.addItem(dataValue)
    },
  });
popupTravelFormSubmit.setEventListeners();


openModalTravelButton.addEventListener("click", () => {
  formTravel.reset();
  formTravelValidation.resetForm();
  formTravelValidation.disableSubmitButton();
});

/*---------Добавление карточек через кнопку Создать------*/

export const renderCard = (item) => {
  const card = new Card(item, ".card-template", (name, link) => {

    modalWithImage.openImage(link, name);
  });
  // return card;
  return card.generateCard();
};

//Отрисовывание карточек

const cardList = new Section(
  {
    items: photoArray, 
    renderer: renderCard
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


