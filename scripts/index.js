/*----------Переменные открытие и закрытие попапов----------------*/
const popUpOpen = document.querySelector(".edit-button");
const popUpClose = document.querySelector(".popup-close");
const popUpUserInfo = document.querySelector(".popup");
const profInfo = document.querySelector(".form__input-container_prof-info");
const nameInfo = document.querySelector(".form__input-container_name-info");
const userName = document.querySelector(".profile__name");
const userInfo = document.querySelector(".profile__job");
const trawelInfoOpen = document.getElementById("trawelInfo");
const cardButtonAdd = document.querySelector(".add-button");
const trawelCardclose = document.getElementById("closeTravel");

/*---------------Переменные для создание новых карточек-----------------------*/
const template = document.getElementById("card-template");
const newNameCard = document.querySelector(".card__caption");
const newUrlInfo = document.querySelector(".card__pic");
const cardContainer = document.querySelector(".grid-gallery");
const formTravel = document.getElementById("popUpTravel");
const namePicAdd = document.getElementById("cardInfo");
const urlAdd = document.getElementById("urlInfo");
const picOpen = document.getElementById("zoomPic");
const picZoom = document.querySelector(".popup__zoom-pic");
const captureZoom = document.querySelector(".popup__capture");
const closePic = document.querySelector(".popup-close_pic");


function openModal(selector) {
 selector.classList.add("popup_opened");
}
function closeModal(selector) {
  selector.classList.remove("popup_opened");
}

function propfilePopupOpen(){
  openModal(popUpUserInfo);
  nameInfo.value = userName.textContent;
  profInfo.value = userInfo.textContent;
}

popUpOpen.addEventListener("click", () => propfilePopupOpen());

popUpClose.addEventListener("click", () => closeModal(popUpUserInfo));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal(popUpUserInfo);
  }
});

/*------ отправка формы---------------- */
const formSubmit = document.querySelector(".form");

formSubmit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closeModal(popUpUserInfo);
});

/*---------заполнение информации пользователя-------------*/

function saveInfoModal() {
  userName.textContent = nameInfo.value;
  userInfo.textContent = profInfo.value;
}

formSubmit.addEventListener("click", () => saveInfoModal());

/*-------вкл/выкл попап добавления картинок----------*/

cardButtonAdd.addEventListener("click", () => openModal(trawelInfoOpen));
trawelCardclose.addEventListener("click", () => closeModal(trawelInfoOpen));


const photoArray = [
  { 
    name: "Коста-Рика", 
    src: "./image/Costa_Rica.jpg"
  },
  { 
    name: "Греция",
    src: "./image/Greece.jpg"
  },
  { 
    name: "Австралия",
    src: "./image/Blue_Mountains_Australia.jpg"
  },
  { 
    name: "Индия",
    src: "./image/India1.jpg"
  },
  { 
    name: "Франция",
    src: "./image/Isola_france.jpg"
  },
  { 
    name: "Рио-де-Жанейро",
    src: "./image/Rio_de_Janeiro.jpg"
  },
];

function openModalPic(card) {
  picOpen.classList.add("popup_opened");
  captureZoom.textContent = card.name;
  picZoom.src = card.src;
  picZoom.alt = card.src;

} // открыть картинку

function closeModalPic() {
  picOpen.classList.remove("popup_opened");
} // закрыть картинку


const creatBlock = (card) => {
  const task = template.content.querySelector(".card").cloneNode(true);
  const cardPic = task.querySelector('.card__pic');
  task.querySelector(".card__caption").textContent = card.name;
  cardPic.src = card.src;
  cardPic.alt = card.name;

  task.querySelector(".card__delete").addEventListener("click", () => {
    task.remove();
  }); // слушатель удаления карточки

  task.querySelector(".button-like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("button-like_active");
  }); // слушатель лайка

  //вкл/выкл большое изображение
  cardPic.addEventListener("click", () => openModalPic(card));
  closePic.addEventListener("click", () => closeModal(picOpen));

  return task;
};

const cardRender = (card) => {
  cardContainer.prepend(creatBlock(card));
};

const elements = photoArray.map((card) => {
  return creatBlock(card);
});

/*---------Добавление карточек через кнопку Создать------*/

const addCard = (event) => {
  event.preventDefault();
  const card = { name: namePicAdd.value, src: urlAdd.value };
  cardRender(card);
  closeModal(trawelInfo);
  namePicAdd.value = "";
  urlAdd.value = "";
};

cardContainer.append(...elements);
formTravel.addEventListener("submit", addCard);
