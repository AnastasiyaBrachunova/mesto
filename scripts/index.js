import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";



import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import { photoArray, openModalUserButton,
  openModalTravelButton, } from "./utils/constants.js";




// /*----------Переменные открытие и закрытие попапов----------------*/


const modalPic = document.getElementById("zoomPic");
const modalUserInfo = document.getElementById("profilePopup");
const modalTravelInfo = document.getElementById("trawelInfo");

const userInfoClose = document.getElementById("closeUserInfo");

const profInfo = document.querySelector(".form__input-container_prof-info");
const nameInfo = document.querySelector(".form__input-container_name-info");
const userName = document.querySelector(".profile__name");
const userInfo = document.querySelector(".profile__job");
const formUserInfo = document.getElementById("formUserInfo");
const trawelCardclose = document.getElementById("closeTravel");

/*---------------Переменные для создание новых карточек-----------------------*/

const cardContainer = document.querySelector(".grid-gallery");
const formTravel = document.getElementById("popUpTravel");
const namePicAdd = document.getElementById("cardInfo");
const urlAdd = document.getElementById("urlInfo");

/*----универсальное открытие и закрытие модальных окон-------*/

// function escClose(evt) {
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
// }

// popUpUserInfo.addEventListener("click", overlayClose); 
// trawelInfoOpen.addEventListener("click", overlayClose); 
// picOpen.addEventListener("click", overlayClose);

const popupTravel = new Popup (modalTravelInfo);
const popupUserInfo = new Popup (modalUserInfo);
const popupPic = new Popup (modalPic)

openModalUserButton.addEventListener('click', () => {
  nameInfo.value = userName.textContent;
  profInfo.value = userInfo.textContent;
  formUserInfoValidation.resetForm();
  formUserInfoValidation.enableSubmitButton();
  popupUserInfo.openPopup();
})

openModalTravelButton.addEventListener('click', () => {
  formTravel.reset();
  formTravelValidation.resetForm();
  formTravelValidation.disableSubmitButton();
  popupTravel.openPopup();
})

popupTravel.setEventListeners();
popupUserInfo.setEventListeners();
popupPic.setEventListeners();

/*-----------------------------------------------------------*/
openModalUserButton.addEventListener('click', () => {
  const PopupUserFormSubmit = new PopupWithForm({formSelector: modalUserInfo,
    handleFormSubmit: (formData) => {
      const dataValue = [{
        nameInfo: formData.userName,
        profInfo: formData.userInfo
      }]
      console.log(dataValue)
    }
    })
    PopupUserFormSubmit.setEventListeners()
}) 

openModalTravelButton.addEventListener('click', () => {
  const PopupTravelFormSubmit = new PopupWithForm({formSelector: modalTravelInfo,
    handleFormSubmit: (formData) => {
      const dataValue = [{
        name: formData.namecards,
        link: formData.linkcards
      }]
      console.log(dataValue)
    }
    })
    PopupTravelFormSubmit.setEventListeners()
}) // проверить как работатет с удалением в addCard cardElement






// openModalUserButton.addEventListener("click", () => {
//   formUserInfoValidation.resetForm();
//   formUserInfoValidation.enableSubmitButton();
//   valuePropfilePopUp();
// });

// userInfoClose.addEventListener("click", () => {
//   closeModal(modalUserInfo);
// });

/*------ заполнение информации пользователя и отправка формы---------------- */

const formUserInfoSubmit = document.getElementById("formUserInfo");

function saveInfoModal() {
  userName.textContent = nameInfo.value;
  userInfo.textContent = profInfo.value;
}

formUserInfoSubmit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  saveInfoModal();
  // closeModal(modalUserInfo);
});

/*-------вкл/выкл попап добавления картинок----------*/

// openModalTravelButton.addEventListener("click", () => {
//   formTravel.reset();
//   formTravelValidation.resetForm();
//   formTravelValidation.disableSubmitButton();
//   // openModal(modalTravelInfo);
// });

// trawelCardclose.addEventListener("click", () => closeModal(modalTravelInfo));

// closePic.addEventListener("click", () => closeModal(modalPic)); //закрыть картинку

/*---------Добавление карточек через кнопку Создать------*/

export const renderCard = (item) => {
  const card = new Card(item, ".card-template");
  // return card;
  return card.generateCard();
};

const addCard = (event) => {
  event.preventDefault();
  const cardElement = renderCard({
    name: namePicAdd.value,
    link: urlAdd.value,
  });
  // const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
  closeModal(modalTravelInfo);
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




const modalWithImage = new PopupWithImage(modalPic) 

const imageCard = document.querySelectorAll(".card__pic");

imageCard.forEach((item) => { 
 
  item.addEventListener("click", () => {
    modalWithImage.openPopupImage(item.src, item.alt)
  });

}); 