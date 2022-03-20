
/*----------открытие и закрытие попапа----------------*/
const openPopUp = document.querySelector('.edit-button');
const closePopUp = document.querySelector('.popup-close');
const popUp = document.querySelector('.popup');

openPopUp.addEventListener('click', () => {
    popUp.classList.add('open');
});

closePopUp.addEventListener('click', () =>{
    popUp.classList.remove('open');
})

document.addEventListener('keydown', (e) => {
	if( e.key === "Escape" ){ 
        popUp.classList.remove('open');
	}
});





/*------ отправка формы---------------- */
let submitForm = document.querySelector('.form');
submitForm.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  popUp.classList.remove('open');
})

/*---------заполнение информации пользователя-------------*/

const profInfo = document.querySelector('.form__input-container_prof-info');
const nameInfo = document.querySelector('.form__input-container_name-info');
let userName = document.querySelector('.profile__name');
let userInfo = document.querySelector('.profile__job');


const submitButton = document.querySelector('.form__button-submit');

submitButton.addEventListener('click', () =>{

    userName.textContent = nameInfo.value
    userInfo.textContent = profInfo.value

});








