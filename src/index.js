import './index.css';
import {showCards} from "./components/cards";
import {showPopup, hidePopup} from './components/modal';
import {deleteCard ,createCard} from "./components/card";
import {clearValidation, enableValidation} from "./components/validation";
import {createProfile, editProfileAvatar} from "./components/profile";
import {addCardToServer, saveProfileAtServer} from "./components/api";

//General elements
export const templateCard = document.querySelector("#card-template").content;
const content = document.querySelector('.content');
export const placesList = content.querySelector('.places__list');
const profile = content.querySelector('.profile');

//Profile elements
const profileInfo = profile.querySelector('.profile__info');
export const profileImage = profile.querySelector('.profile__image');
export const profileTitle = profileInfo.querySelector('.profile__title');
export const profileDescription = profileInfo.querySelector('.profile__description');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');

//Popup elements of adding card
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardContent = popupNewCard.querySelector('.popup__content');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close');
const popupNewCardButtonSubmit = popupNewCard.querySelector('.popup__button');
const popupNewCardForm = popupNewCardContent.querySelector('.popup__form');
const popupNewCardName = popupNewCardForm.querySelector('.popup__input_type_card-name');
const popupCardImageLink = popupNewCardForm.querySelector('.popup__input_type_url');

popupNewCard.classList.add('popup_is-animated');

//Popup elements of editing profile
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileContent = popupEditProfile.querySelector('.popup__content');
const popupEditProfileButtonSubmit = popupEditProfile.querySelector('.popup__button');
const popupEditProfileCloseButton = popupEditProfileContent.querySelector('.popup__close');
const popupEditForm = popupEditProfileContent.querySelector('.popup__form');
const popupProfileTitle = popupEditForm.querySelector('.popup__input_type_name');
const popupProfileDescription = popupEditForm.querySelector('.popup__input_type_description');

popupEditProfile.classList.add('popup_is-animated');

//Popup elements of showing image
const popupImage = document.querySelector('.popup_type_image');
const popupContentImage = popupImage.querySelector('.popup__content_content_image');
const popupImageSource = popupContentImage.querySelector('.popup__image');
const popupCaptionSource = popupContentImage.querySelector('.popup__caption');

popupImage.classList.add('popup_is-animated');

//Popup elements of showing image
export const popupAvatar = document.querySelector('.popup__type_edit-avatar');
const popupAvatarContent = popupAvatar.querySelector('.popup__content');
export const popupAvatarButtonSubmit = popupAvatar.querySelector('.popup__button');
export const popupAvatarCloseButton = popupAvatar.querySelector('.popup__close');
const popupAvatarForm = popupAvatarContent.querySelector('.popup__form');
export const popupAvatarLink = popupAvatarForm.querySelector('.popup__input_type_url');

popupAvatar.classList.add('popup_is-animated');

//EventListeners
profileAddButton.addEventListener('click', addCard);
profileEditButton.addEventListener('click', editProfile);
profileImage.addEventListener('click', editProfileAvatar);

export function showImage(cardImage, cardTitle) {
    popupImageSource.src = cardImage.src;
    popupImageSource.alt = cardImage.alt;
    popupCaptionSource.textContent = cardTitle.textContent;
    showPopup(popupImage);
    popupImage.addEventListener('click', () => exitFromPopup(popupImage));
}
function exitFromPopup(popup) {
    hidePopup(popup);
    if (!popup.classList.contains('popup_type_image')) {
        clearValidation(popup, config);
    }
}

function addCard() {
    popupNewCardName.value = "";
    popupCardImageLink.value = "";
    showPopup(popupNewCard);
    popupNewCard.addEventListener('submit', saveCard);
    popupNewCardCloseButton.removeEventListener('click', () => exitFromPopup(popupNewCard));
}

function editProfile() {
    showPopup(popupEditProfile);
    popupProfileTitle.value = profileTitle.textContent;
    popupProfileDescription.value = profileDescription.textContent;
    popupEditForm.addEventListener('submit', saveProfile);
    popupEditProfileCloseButton.removeEventListener('click', () => exitFromPopup(popupEditProfile));
}

function saveCard(evt) {
    evt.preventDefault();
    popupNewCardButtonSubmit.textContent = "Сохранить...";
    addCardToServer(popupNewCardName.value, popupCardImageLink.value)
        .then((result) => {
            const newCreatedCard = createCard(
                result._id,
                result.name,
                result.link,
                result.likes,
                false,
                showImage,
                deleteCard);
            placesList.prepend(newCreatedCard);
            popupNewCardForm.reset();
            popupNewCardButtonSubmit.textContent = "Сохранить";
            hidePopup(popupNewCard);})
}

function saveProfile(evt) {
    evt.preventDefault();
    popupEditProfileButtonSubmit.textContent = "Сохранить...";
    const title = popupProfileTitle.value;
    const description = popupProfileDescription.value;
    saveProfileAtServer(title, description)
        .then(() => {
        popupEditProfileButtonSubmit.textContent = "Сохранить";
    });
    profileTitle.textContent = title;
    profileDescription.textContent = description;
    hidePopup(popupEditProfile);
    popupProfileTitle.value = "";
    popupProfileDescription.value = "";
}

export const popupAvatarInput = popupAvatarForm.querySelectorAll('.popup__input');
export const popupAvatarSubmit = popupAvatarForm.querySelector('.popup__button');


export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__error',
    errorClass: 'popup__error_visible'
};

createProfile();
showCards();
enableValidation(popupEditForm, config);
enableValidation(popupNewCardForm, config);
enableValidation(popupAvatarForm, config);



