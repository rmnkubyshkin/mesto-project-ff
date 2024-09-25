
export function enableValidation(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const buttonSubmit = form.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonSubmit, config.inactiveButtonClass);
            if (inputElement.validity.patternMismatch) {
                inputElement.setCustomValidity(inputElement.dataset.errorMessage);
            } else {
                inputElement.setCustomValidity("");
            }

            if (!inputElement.validity.valid) {
                showInputError(form, inputElement, inputElement.validationMessage);
            } else {
                hideInputError(form, inputElement);
            }
            toggleButtonState(inputList, buttonSubmit, config.inactiveButtonClass);
        });
    })
}

function hasInvalidInput(popupInput) {
    return Array.from(popupInput).some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function enableButton(popupSubmit, popupSubmitDisabledClass) {
    popupSubmit.disabled = false;
    popupSubmit.classList.remove(popupSubmitDisabledClass);
    popupSubmit.classList.remove('popup__button:hover:disabled');
}

function disableButton(popupSubmit, popupSubmitDisabledClass) {
    popupSubmit.disabled = true;
    popupSubmit.classList.add(popupSubmitDisabledClass);
    popupSubmit.classList.add('popup__button:hover:disabled');
}

function toggleButtonState(popupInput, popupSubmit, popupSubmitDisabledClass) {
    if (!hasInvalidInput(popupInput)) {
        enableButton(popupSubmit, popupSubmitDisabledClass);
    } else {
        disableButton(popupSubmit, popupSubmitDisabledClass);
    }
}

function showInputError(elementPopupForm, inputElement, errorMessage) {
    const errorElement = elementPopupForm.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add('popup__input_type-error');
    errorElement.classList.add('popup__error_visible');

}

function hideInputError(elementPopupForm, inputElement) {
    const errorElement = elementPopupForm.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
    inputElement.classList.remove('popup__input_type-error');
    errorElement.classList.remove('popup__error_visible');
}

export function clearValidation(popup, validationConfig) {
    const form = popup.querySelector(validationConfig.formSelector);
    const input = form.querySelectorAll(validationConfig.inputSelector);
    const submit = form.querySelector(validationConfig.submitButtonSelector);
    input.forEach((inputElement) => {
        hideInputError(form, inputElement);
            });
    enableButton(submit, validationConfig.inactiveButtonClass);
}