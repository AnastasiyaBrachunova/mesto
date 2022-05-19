export const modalUserButton = document.querySelector(".edit-button");
export const modalTravelButton = document.querySelector(".add-button");
export const userInfoClose = document.getElementById("closeUserInfo");
export const popUpUserInfo = document.getElementById("profilePopup");
export const profInfo = document.querySelector(".form__input-container_prof-info");
export const nameInfo = document.querySelector(".form__input-container_name-info");
export const userName = document.querySelector(".profile__name");
export const userInfo = document.querySelector(".profile__job");
export const trawelInfoOpen = document.getElementById("trawelInfo");
export const formUserInfo = document.getElementById("formUserInfo");
export const trawelCardclose = document.getElementById("closeTravel");
/*---------------Переменные для создание новых карточек-----------------------*/
export const cardContainer = document.querySelector(".grid-gallery");
export const formTravel = document.getElementById("popUpTravel");
export const namePicAdd = document.getElementById("cardInfo");
export const urlAdd = document.getElementById("urlInfo");
export const picOpen = document.getElementById("modalPic"); //формселектор картинки
export const closePic = document.querySelector(".popup-close_pic");
const captureZoom = document.querySelector(".popup__capture");
const picZoom = document.querySelector(".popup__zoom-pic");

export const photoArray = [
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