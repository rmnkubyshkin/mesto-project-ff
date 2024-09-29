import {clearValidation} from "./validation";
import {config} from "../index";

function closePopupByOverlay(evt){
    if (evt.target.matches('.popup') || evt.target.matches('.popup__close')) {
        hidePopup(evt.currentTarget);}
}

function closePopupByEsc(evt){
    if (evt.key === 'Escape') {
        hidePopup(document.querySelector('.popup_is-opened'));}
}

export function showPopup(popup) {
    document.addEventListener('keydown',closePopupByEsc);
    popup.addEventListener('click', closePopupByOverlay);
    popup.classList.add('popup_is-opened')
}

export function hidePopup(popup) {
    const form = popup.querySelector(config.formSelector);
    if (!popup.classList.contains('popup_type_image')) {
        clearValidation(form, config);}

    document.removeEventListener('keydown',closePopupByEsc);
    popup.removeEventListener('click', closePopupByOverlay);
    popup.classList.remove('popup_is-opened');
}