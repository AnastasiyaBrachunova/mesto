
/*----------открытие и закрытие попапа----------------*/
const openPopUp = document.querySelector('.edit-button');
const closePopUp = document.querySelector('.popup-close');
const popUp = document.querySelector('.popup');
const profInfo = document.querySelector('.form__input-container_prof-info');
const nameInfo = document.querySelector('.form__input-container_name-info');
let userName = document.querySelector('.profile__name');
let userInfo = document.querySelector('.profile__job');

function openModal () {
    popUp.classList.add('open');
    nameInfo.value = userName.textContent
    profInfo.value = userInfo.textContent
}

function closeModal ( ) {
  popUp.classList.remove('open');
}

openPopUp.addEventListener('click', () => openModal());

closePopUp.addEventListener('click', () => closeModal())

document.addEventListener('keydown', (e) => {
	if( e.key === "Escape" ){ 
       closeModal();
	}
});

/*------ отправка формы---------------- */
let submitForm = document.querySelector('.form');
 

submitForm.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  closeModal();})

/*---------заполнение информации пользователя-------------*/

const submitButton = document.querySelector('.form__button-submit');

function saveInfoModal (){
  userName.textContent = nameInfo.value
  userInfo.textContent = profInfo.value
}


submitForm.addEventListener('click', () => saveInfoModal())








