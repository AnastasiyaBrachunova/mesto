
/*----------открытие и закрытие попапа----------------*/
let openPopUp = document.querySelector('.edit-button');
let closePopUp = document.querySelector('.popup-close');
let popUp = document.querySelector('.popup');

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


/*popUp.addEventListener('click', () =>{
    popUp.classList.remove('open');
})*/


/*------ отправка формы---------------- */
let submitForm = document.querySelector('.form');
submitForm.addEventListener('submit', () =>{
  evt.preventDefault();
  popUp.classList.remove('open');
})

/*---------заполнение информации пользователя-------------*/

let nameInfo = document.querySelector('.form__input-container_name-info');
let profInfo = document.querySelector('.form__input-container_prof-info');

