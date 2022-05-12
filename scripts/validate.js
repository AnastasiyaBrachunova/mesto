


// const showInputError = (formElement, inputElement, errorMessage, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
// };

// const hideInputError = (formElement, inputElement, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';

// };

// const checkInputValidity = (formElement, inputElement, config) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, config);
//   } 
//   else if (inputElement.value === "") {
//     showInputError(formElement, inputElement, inputElement.validationMessage, config);
//   }
  
//   else {
//     hideInputError(formElement, inputElement, config);
//   }
// };

// function hasInvalidInput(inputList){
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   }); 
// }

// const setEventListeners = (formElement, config) => {
//   const inputList = Array.from(formElement.querySelectorAll(config.formInput));
//   const buttonElement = formElement.querySelector(config.buttonElement);
//   toggleButtonState(inputList, buttonElement, config);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement, config);
//       toggleButtonState(inputList, buttonElement, config);

//     });
//   });
// };


// function enableValidation (config){
//   const formList = Array.from(document.querySelectorAll(config.form));
// formList.forEach((formElement) => {
//   formElement.addEventListener('submit', (evt) => {
//   });
//     setEventListeners(formElement, config);
// });
// }

// function toggleButtonState (inputList, buttonElement, config) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(config.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//     buttonElement.disabled = false;
//   } 
// }

// const disableSubmitButton = (buttonElement, config) => {
//   buttonElement.classList.add(config.inactiveButtonClass);
//   buttonElement.disabled = true;
// }

//  function resetForm(){
//   const errorInputList = Array.from(document.querySelectorAll('.form__input-container'));
//   const errorlist = Array.from(document.querySelectorAll('.form__input-error_active'));
//   errorlist.forEach((errorElement) => {
//     errorElement.classList.remove('form__input-error_active');
//     errorElement.textContent = "";
//   });
//   errorInputList.forEach((inputElement) => {
//     inputElement.classList.remove('form__input-container_error');
//     inputElement.value = "";
//   });
// }
 
// enableValidation(formForValidation);