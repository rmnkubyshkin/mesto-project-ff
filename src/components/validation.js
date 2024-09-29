export function enableValidation(config) {
    const formElement = document.querySelectorAll(config.formSelector);
    formElement.forEach((singleForm) => {
        const inputList = singleForm.querySelectorAll(config.inputSelector);
        const buttonSubmit = singleForm.querySelector(config.submitButtonSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                toggleButtonState(inputList, buttonSubmit, config.inactiveButtonClass, config.buttonHoverDisabled);
                if (inputElement.validity.patternMismatch) {
                    inputElement.setCustomValidity(inputElement.dataset.errorMessage);}
                else {
                    inputElement.setCustomValidity("");}
                if (!inputElement.validity.valid) {
                    showInputError(singleForm, inputElement, inputElement.validationMessage, config);}
                else {
                    hideInputError(singleForm, inputElement, config);}
                toggleButtonState(inputList, buttonSubmit, config.inactiveButtonClass, config.buttonHoverDisabled);
            });
        })
    });
}

function hasInvalidInput(popupInput) {
    return Array.from(popupInput).some((inputElement) => {
        return !inputElement.validity.valid;})
}

function enableButton(popupSubmit, popupSubmitDisabledClass, buttonHoverDisabled) {
    popupSubmit.disabled = false;
    popupSubmit.classList.remove(popupSubmitDisabledClass);
    popupSubmit.classList.remove(buttonHoverDisabled);
}

function disableButton(popupSubmit, popupSubmitDisabledClass, buttonHoverDisabled) {
    popupSubmit.disabled = true;
    popupSubmit.classList.add(popupSubmitDisabledClass);
    popupSubmit.classList.add(buttonHoverDisabled);
}

function toggleButtonState(popupInput, popupSubmit, popupSubmitDisabledClass, buttonHoverDisabled) {
    if (!hasInvalidInput(popupInput)) {
        enableButton(popupSubmit, popupSubmitDisabledClass, buttonHoverDisabled);}
    else {
        disableButton(popupSubmit, popupSubmitDisabledClass, buttonHoverDisabled);}
}

function showInputError(elementPopupForm, inputElement, errorMessage, config) {
    const errorElement = elementPopupForm.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);

}

function hideInputError(elementPopupForm, inputElement, config) {
    const errorElement = elementPopupForm.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
}

export function clearValidation(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submit = form.querySelector(config.submitButtonSelector);
    inputList.forEach((input) => {
        hideInputError(form, input, config);})
    enableButton(submit, config.inactiveButtonClass, config.buttonHoverDisabled);
}