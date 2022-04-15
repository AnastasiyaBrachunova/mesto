// const addUserForm = document.forms.user;
// const addTravelForm = document.forms.travel;

// const validateInput = (input) =>{
//   const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
//   // валидируем инпут
//   errorElement.textContent = input.validationMessage;

// }

// const enableButton = (button, inactiveButtonClass) =>{
//   button.disabled = false;
//   button.classList.remove(inactiveButtonClass);
// }

// const disableButton = (button, inactiveButtonClass) =>{
//   button.disabled = true;
//   button.classList.add(inactiveButtonClass);
// }

// const travelButton = addTravelForm.querySelector('.form__button-submit');
// disableButton(travelButton, 'form__button-submit_invalid');

// const setButtonState = (button, isValid) =>{
//   if (isValid){
//     enableButton(button, 'form__button-submit_invalid');

//   } else{
//     disableButton(button, 'form__button-submit_invalid');
//   }
// }
// const handleInput = (event) => {   // обработчик поля ввода
//   const currentForm = event.currentTarget;
//   const input = event.target;
//   const submitButton = currentForm.querySelector('.form__button-submit');
//   validateInput(input);
//   setButtonState(submitButton, currentForm.checkValidity());
// }

// const handleSubmit = (event) =>{ // обработчик сабмита
//  event.preventDefault();

//  const currentForm = event.target;

//  if (currentForm.checkValidity()){
//   currentForm.reset();
//  }
// }
// addUserForm.addEventListener('submit', handleSubmit);
// addTravelForm.addEventListener('submit', handleSubmit);

// addUserForm.addEventListener('input', handleInput);
// addTravelForm.addEventListener('input', handleInput);








// // const form = document.querySelector(".form");
// // const formInput = form.querySelector(".form__input-container");
// // const formError = form.querySelector(`.${formInput.id}-error`); 

// function enableValidation (config){
//   const formList = Array.from(document.querySelectorAll(config.form));
//   formList.forEach((formElement) => {
//   formElement.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     });
//     setEventListeners(formElement, config);
//   });
// }

// function setEventListeners (formElement, config){
//   const inputList = Array.from(formElement.querySelectorAll(config.formInput));
//   const buttonElement = formElement.querySelector(config.buttonElement);
//   toggleButtonState(inputList, buttonElement, config);


//   inputList.forEach((inputElement) => {
  
//   inputElement.addEventListener('input', function () {
//     checkInputValidity(formElement, inputElement, config);
//     toggleButtonState(inputList, buttonElement, config);
//     });
//   });
// }

// const checkInputValidity = (formElement , inputElement, config) => {
//   const form = document.querySelector(config.form)
//   const formInput = form.querySelector(config.formInput);

//   if (!formInput.validity.valid) {
//     showInputError(formElement,inputElement, formInput.validationMessage, config);
//   } else {
//     hideInputError(formElement,inputElement, config);
//   }
// };

// const showInputError = (formElement, inputElement, errorMessage, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass); 
// };

// const hideInputError = (formElement, inputElement, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// };


// function toggleButtonState (inputList, buttonElement, config) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(config.inactiveButtonClass);
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//   } 
// }

// function hasInvalidInput(inputList){
//   return inputList.some((inputElement) => {
//   return !inputElement.validity.valid;
// }); 
// }
// // setEventListeners(form);

// // form.addEventListener("submit", function (evt) {
// //   evt.preventDefault();
// // });


// // formInput.addEventListener('input', function () {
// //   checkInputValidity(form, formInput);
// // });

// enableValidation({
//   form: '.form',
//   formInput: '.form__input-container',
//   buttonElement: '.form__button-submit',
//   inactiveButtonClass: 'form__button-submit_invalid',
//   inputErrorClass: 'form__input-container_error"',
//   errorClass: 'form__input-error_active'
// });










const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};


const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';

};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};


const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.formInput));
  const buttonElement = formElement.querySelector(config.buttonElement);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);

    });
  });
};



function enableValidation (config){
  const formList = Array.from(document.querySelectorAll(config.form));
formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    setEventListeners(formElement, config);
});
}


enableValidation({
    form: '.form',
    formInput: '.form__input-container',
    buttonElement: '.form__button-submit',
    inactiveButtonClass: 'form__button-submit_invalid',
    inputErrorClass: 'form__input-container_error"',
    errorClass: 'form__input-error_active',
    closeButton: '.popup-close',
  });


function toggleButtonState (inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  } 
}

function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 

}
//  const validateSpan = () => {
//     const spanList = Array.from(document.querySelectorAll('.form__input-error_active'));
//     spanList.forEach((input) => {
//       input.value = "";
//     });
