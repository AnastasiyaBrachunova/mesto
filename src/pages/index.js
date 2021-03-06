import "../pages/index.css";
import Card from "../scripts/components/Card.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithDelete from "../scripts/components/PopupWithDelete.js";
import UserInfo from "../scripts/components/UserInfo.js";
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
  formForValidation,
  avatarButton,
} from "../scripts/utils/constants.js";



//***********СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ ****************/

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "c4a8f698-8e70-49c6-8a02-f1bba01faba1",
    "Content-Type": "application/json",
  },
});

const formUserInfoValidation = new FormValidator(
  formForValidation,
  formUserInfo
);
const formTravelValidation = new FormValidator(formForValidation, formTravel);
const formChangeAvatarValidation = new FormValidator(
  formForValidation,
  formChangeAvatar
);

const inputUserInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userJobSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

const modalWithImage = new PopupWithImage(".popup_zoomPic");

const popupDelCard = new PopupWithForm({
  popupSelector: ".popup_cardDelete",
}); // создала новый экземпляр класса обработчиа

const modalSubmitDelete = new PopupWithDelete(".popup_cardDelete");

//******ВКЛЮЧЕНИЕ ВАЛИДАЦИИ *********/

formUserInfoValidation.enableValidation();
formTravelValidation.enableValidation();
formChangeAvatarValidation.enableValidation();
///////////////////////////////////////////////////////////


let userId = null;

const cardList = new Section(
  {
    renderer: (item) => {
      // функция для отрисоки 1 элемента называется renderer
      const card = renderCard(item); // переиспользовали функцию создания карточки
      cardList.addItem(card, "after"); // вставили в разметку с помощью имеющегося метода класса Section
    },
  },
  ".grid-gallery"
);

api.getAllData()
  .then(([ userData, cardArray ]) => {

    userId = userData._id;

    inputUserInfo.setUserInfo({ 
      userName: userData.name, 
      profInfo: userData.about, 
      avatar: userData.avatar, 
    });  
    
    cardList.renderItems(cardArray)
})
.catch((err) => {
  //попадаем сюда если один из промисов завершится ошибкой
  console.log(`Ошибка запроса данных с сервера ${err}`);
});

function renderCard (item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: (name, link) => {
        modalWithImage.openPopup(link, name);
      },
      handleLikeClick: () => {
        const idCard = card.getCardId();
        if (card.isLiked) {
          api
            .remLikeCard(idCard)
            .then((res) => {
              // const likesArray = res.likes;
              card.unSetCardLike();
              card.counterLikes(res.likes.length);
            })
            .catch((err) => {
              console.log(`Ошибка дизлайка ${err}`);
            });
        } else {
          api
            .addLikeCard(idCard)
            .then((res) => {
              // const likesArray = res.likes;
              card.setCardLike();
              card.counterLikes(res.likes.length);
            })
            .catch((err) => {
              console.log(`Ошибка лайка ${err}`);
            });
        }
      },
      handleDeleteClick: (event) => {
        const idCard = card.getCardId();
        modalSubmitDelete.setSubmit((event) => {
          // event.preventDefault();
          popupDelCard.setLoader(true);
          api
            .delInitialCards(idCard)
            .then(() => {
              card.cardDelete();
              modalSubmitDelete.closePopup();
            })
            .catch((err) => {
              console.log(`Ошибка удаления изображения ${err}`);
            })
            .finally(() => {
              popupDelCard.setLoader(false);
            });
        });
        modalSubmitDelete.openPopup();
      },
    },
    ".card-template",
    userId
  );
  return card.generateCard();
};

const popupTravelFormSubmit = new PopupWithForm({
  popupSelector: ".popup_trawel",
  handleFormSubmit: (formData) => {
    popupTravelFormSubmit.setLoader(true);
    api
      .setInitialCard(formData.name, formData.link)
      .then((res) => {
        const card = renderCard(res); // переиспользовали функцию создания карточки
    cardList.addItem(card);
        popupTravelFormSubmit.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки изображения ${err}`);
      })
      .finally(() => {
        popupTravelFormSubmit.setLoader(false);
      });
  },
});

const popupUserFormSubmit = new PopupWithForm({
  popupSelector: ".popup_profile",
  handleFormSubmit: (formData) => {
    popupUserFormSubmit.setLoader(true);
    api
      .setUserInfo(formData.userName, formData.profInfo)
      .then((userInfoApi) => {
        inputUserInfo.setUserInfo({
          userName: userInfoApi.name,
          profInfo: userInfoApi.about,
          avatar: userInfoApi.avatar,
        });
        popupUserFormSubmit.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка смены данных пользователя ${err}`);
      })
      .finally(() => {
        popupUserFormSubmit.setLoader(false);
      });
  },
});

const popupChangeAvatar = new PopupWithForm({
  popupSelector: ".popup_avatarChange",
  handleFormSubmit: (formData) => {
    popupChangeAvatar.setLoader(true);
    api
      .setUserAvatar(formData.avatar)
      .then((userInfoApi) => {
        inputUserInfo.setUserInfo({
          userName: userInfoApi.name,
          profInfo: userInfoApi.about,
          avatar: userInfoApi.avatar,
          // userId: userInfoApi._id,
        });
        popupChangeAvatar.closePopup();
      })
      .catch((err) => {
        console.log(`Ошибка смены аватара ${err}`);
      })
      .finally(() => {
        popupChangeAvatar.setLoader(false);
      });
  },
});


  //*************** УСТАНОВКА СЛУШАТЕЛЕЙ  *****************/

  avatarButton.addEventListener("click", () => {
    formChangeAvatarValidation.resetForm();
    formChangeAvatarValidation.disableSubmitButton();
    popupChangeAvatar.openPopup();
  });

  openModalTravelButton.addEventListener("click", () => {
    formTravelValidation.resetForm();
    formTravelValidation.disableSubmitButton();
    popupTravelFormSubmit.openPopup();

  });

  openModalUserButton.addEventListener("click", () => {
    const getUserInfo = inputUserInfo.getUserInfo();
    formUserInfoValidation.resetForm();
    formUserInfoValidation.enableSubmitButton();
    userName.value = getUserInfo.userName;
    userInfo.value = getUserInfo.profInfo;
    popupUserFormSubmit.openPopup();
  });
  modalWithImage.setEventListeners();
  popupUserFormSubmit.setEventListeners();
  popupChangeAvatar.setEventListeners();
  popupTravelFormSubmit.setEventListeners();
  modalSubmitDelete.setEventListeners();

