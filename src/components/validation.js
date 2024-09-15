export function enableValidation(
                 popupForm,
                 popupInput,
                 popupError,
                 popupSubmit,
                 popupSubmitDisabledClass
                 ) {
    popupInput.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(popupInput, popupSubmit, popupSubmitDisabledClass);
            if (!inputElement.validity.valid) {
                showInputError(popupForm, inputElement, inputElement.validationMessage);
            } else {
                hideInputError(popupForm, inputElement);
            }
        });
    })
}

function hasInvalidInput(popupInput) {
    return Array.from(popupInput).some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(popupInput, popupSubmit, popupSubmitDisabledClass) {
    if (!hasInvalidInput(popupInput)) {
        popupSubmit.disabled = false;
        popupSubmit.classList.remove(popupSubmitDisabledClass);
        popupSubmit.classList.remove('popup__button:hover:disabled');
    } else {
        popupSubmit.disabled = true;
        popupSubmit.classList.add(popupSubmitDisabledClass);
        popupSubmit.classList.add('popup__button:hover:disabled');
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

export function clearValidation(profileForm, validationConfig) {

}