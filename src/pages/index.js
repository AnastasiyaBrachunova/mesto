import "../pages/index.css";
import Card from "../scripts/components/Card.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithDelete from "../scripts/components/popupWithDelete";
import UserInfo from "../scripts/components/UserInfo.js";
import Popup from "../scripts/components/Popup.js";
import Api from "../scripts/components/Api.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import {
  openModalUserButton,
  openModalTravelButton,
  userName,
  userInfo,
  formUserInfo,
  formTravel,
  formChangeAvatar,
  cardsContainer,
  formForValidation,
} from "../scripts/utils/constants.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "c4a8f698-8e70-49c6-8a02-f1bba01faba1",
    "Content-Type": "application/json",
  },
});

/*----универсальное открытие и закрытие модальных окон-------*/

api.getUserInfo().then((userInfoApi) => {
  const inputUserInfo = new UserInfo({
    userNameSelector: ".profile__name",
    userJobSelector: ".profile__job",
    avatarSelector: ".profile__avatar",
  });

  const initialCardsPromise = () =>
    api.getInitialCards().then((cardsApi) => {
      const cardList = new Section(
        {
          items: cardsApi,
          renderer: (item) => {
            // функция для отрисоки 1 элемента называется renderer
            const card = renderCard(item); // переиспользовали функцию создания карточки
            cardList.addItem(card); // вставили в разметку с помощью имеющегося метода класса Section
          },
        },
        ".grid-gallery"
      );
      cardList.renderItems();
    });

  initialCardsPromise();


  // ВКЛЮЧЕНИЕ ВАЛИДАЦИИ

  const formUserInfoValidation = new FormValidator(formForValidation, formUserInfo);
  formUserInfoValidation.enableValidation();

  const formTravelValidation = new FormValidator(formForValidation, formTravel);
  formTravelValidation.enableValidation();

  const formChangeAvatarValidation = new FormValidator(formForValidation, formChangeAvatar);





  // получение информации о пользователе  пользователя с сервера
  inputUserInfo.setUserInfo({
    userName: userInfoApi.name,
    profInfo: userInfoApi.about,
    avatar: userInfoApi.avatar,
  });


  document.querySelector(".edit-button").addEventListener("click", () => {
    popupUserFormSubmit.openPopup();
  });

  document.querySelector(".add-button").addEventListener("click", () => {
    popupTravelFormSubmit.openPopup();
  });

  


  const modalWithImage = new PopupWithImage("zoomPic");
  modalWithImage.setEventListeners();

  document.querySelector(".profile__overlay").addEventListener("click", () => {
    const modalAvatarChange = new Popup("avatarChange");
    modalAvatarChange.openPopup();
    formChangeAvatarValidation.enableValidation();
    modalAvatarChange.setEventListeners();
  }); // открытие модалки редактирования фотки

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*---Установка слушателя на сабмит, получение данных из инпутов смена ифно пользователя--*/
  //
  const popupUserFormSubmit = new PopupWithForm({
    popupSelector: "profilePopup",
    handleFormSubmit: (formData) => {
      popupUserFormSubmit.setLoader(true);
      api.setUserInfo(formData.userName, formData.profInfo)
        .then((userInfoApi) => {
          inputUserInfo.setUserInfo({
            userName: userInfoApi.name,
            profInfo: userInfoApi.about,
            avatar: userInfoApi.avatar,
          });
        })
        .catch((err) => {
          console.log(`Ошибка смены данных пользователя ${err}`);
        })
        .finally(() => {
          popupUserFormSubmit.setLoader(false);
        })
    },
  });
  popupUserFormSubmit.setEventListeners();
  /////////////////////////////////////////////////////////////////////////////////

    // смена аватарки
  const popupChangeAvatar = new PopupWithForm({
    popupSelector: "avatarChange",
    handleFormSubmit: (formData) => {
      popupChangeAvatar.setLoader(true);
      api.setUserAvatar(formData.avatar).then((userInfoApi) => {
        inputUserInfo.setUserInfo({
          userName: userInfoApi.name,
          profInfo: userInfoApi.about,
          avatar: userInfoApi.avatar,
          userId: userInfoApi._id
        });
      })
      .catch((err) => {
        console.log(`Ошибка смены аватара ${err}`);
      })
      .finally(() => {
        popupChangeAvatar.setLoader(false);
      })
    },
  });
  popupChangeAvatar.setEventListeners();

  openModalUserButton.addEventListener("click", () => {
    const getUserInfo = inputUserInfo.getUserInfo();

    formUserInfoValidation.resetForm();
    formUserInfoValidation.enableSubmitButton();
    userName.value = getUserInfo.userName;
    userInfo.value = getUserInfo.profInfo;
  });
  /////////////////////////////////////////////////////////////////

  const popupTravelFormSubmit = new PopupWithForm({
    popupSelector: "trawelInfo",
    handleFormSubmit: (formData) => {
      popupTravelFormSubmit.setLoader(true);
      api.setInitialCard(formData.name, formData.link).then((res) => {
        if (res) {
          cardsContainer.innerHTML = "";
          initialCardsPromise();
        }
      })
      .catch((err) => {
        console.log(`Ошибка загрузки изображения ${err}`);
      })
      .finally(() => {
        popupTravelFormSubmit.setLoader(false);
      })
    },
  });
  popupTravelFormSubmit.setEventListeners();

  openModalTravelButton.addEventListener("click", () => {
    formTravel.reset();
    formTravelValidation.resetForm();
    formTravelValidation.disableSubmitButton();
  });

  const popupDelCard = new PopupWithForm({
    popupSelector: "popupCardDelete",
  }); // создала новый экземпляр класса обработчиа

const submitDelete = new PopupWithDelete('popupCardDelete')





  const renderCard = (item) => {
    const card = new Card(
      {
        data: item,
        handleCardClick: (name, link) => {
          modalWithImage.openImage(link, name);
        },
        handleLikeClick: () => {
          const idCard = card.getCardId();
          if (card.isLiked) {
            api
              .remLikeCard(idCard)
              .then((res) => {
                const likesArray = res.likes
                card.cardLikeToggle();
                card.counterLikes(likesArray.length);
               
              })
              .catch((err) => {
                console.log(`Ошибка дизлайка ${err}`);
              });
          } else {
            api
              .addLikeCard(idCard)
              .then((res) => {
                const likesArray = res.likes
                card.cardLikeToggle();
                card.counterLikes(likesArray.length);
              })
              .catch((err) => {
                console.log(`Ошибка лайка ${err}`);
              });
          }
        },

        handleDeleteClick: (event) => {

          const idCard = card.getCardId();
          // const cardElement = event.target.closest(".card");

          submitDelete.setSubmit(() => {
            api.delInitialCards(idCard)
              .then(() => {
                card.cardDelete();
                submitDelete.closePopup();
              })
              .catch((err) => {
                console.log(`Ошибка удаления изображения ${err}`);
              });
          });
          submitDelete.openPopup();
        },
      },
      ".card-template",
      userInfoApi._id
    );

    return card.generateCard();
  };

     
});
