

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
import {popupEditProfile, popupProfileTitle, profileTitle, popupProfileDescription, profileDescription} from "../index";
export function showPopup(popup) {
    if (popup === popupEditProfile) {
        popupProfileTitle.value = profileTitle.textContent;
        popupProfileDescription.value = profileDescription.textContent;
    }
    return popup.classList.add('popup_is-opened');
}