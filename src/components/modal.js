import {
    popupEditProfile,
    popupProfileTitle,
    profileTitle,
    popupProfileDescription,
    profileDescription,
    popupImage,
    popupImageSource,
    popupCaptionSource} from "../index";


export function hidePopup(evt, popup) {
    if (evt.key === 'Escape') {
        document.removeEventListener('keydown', popup);
        popup.classList.remove('popup_is-opened');
    }
    else if (evt.target.matches('.popup') || evt.target.matches('.popup__close')){
        document.removeEventListener('click', popup);
        popup.classList.remove('popup_is-opened');
    }
    else if (evt.type === 'submit') {
        document.removeEventListener('sumbit', popup);
        popup.classList.remove('popup_is-opened');
    }
}

export function showPopup(evt, popup, params=null) {
    if (popup === popupEditProfile) {
        popupProfileTitle.value = profileTitle.textContent;
        popupProfileDescription.value = profileDescription.textContent;
    } else if (popup === popupImage) {
        popupImageSource.src = params.cardImage.src;
        popupImageSource.alt = params.cardImage.alt;
        popupCaptionSource.textContent = params.cardTitle.textContent;
    }
    return popup.classList.add('popup_is-opened');
}