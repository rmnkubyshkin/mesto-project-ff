import './index.css';
import {initialCards, createCard, deleteCard, handleLike} from './components/cards';
import {hidePopup, showPopup} from './components/modal';

//General elements
export const templateCard = document.querySelector("#card-template").content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const profile = content.querySelector('.profile');

//Profile elements
const profileInfo = profile.querySelector('.profile__info');
export const profileTitle = profileInfo.querySelector('.profile__title');
export const profileDescription = profileInfo.querySelector('.profile__description');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');

//Popup elements of adding card
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardContent = popupNewCard.querySelector('.popup__content');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close');
const popupNewCardForm = popupNewCardContent.querySelector('.popup__form');
const popupNewCardName = popupNewCardForm.querySelector('.popup__input_type_card-name');
const popupCardImageLink = popupNewCardForm.querySelector('.popup__input_type_url');

popupNewCard.classList.add('popup_is-animated');

//Popup elements of editing profile
export const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileContent = popupEditProfile.querySelector('.popup__content');
const popupEditProfileCloseButton = popupEditProfileContent.querySelector('.popup__close');
const popupEditForm = popupEditProfileContent.querySelector('.popup__form');
export const popupProfileTitle = popupEditForm.querySelector('.popup__input_type_name');
export const popupProfileDescription = popupEditForm.querySelector('.popup__input_type_description');

popupEditProfile.classList.add('popup_is-animated');

//Popup elements of showing image
export const popupImage = document.querySelector('.popup_type_image');
const popupContentImage = popupImage.querySelector('.popup__content_content_image');
export const popupImageSource = popupContentImage.querySelector('.popup__image');
export const popupCaptionSource = popupContentImage.querySelector('.popup__caption');

popupImage.classList.add('popup_is-animated');

//EventListeners
popupEditForm.addEventListener('submit', saveProfile);
popupNewCardForm.addEventListener('submit', saveCard);
profileEditButton.addEventListener('click', (evt) => showPopup(evt, popupEditProfile));
profileAddButton.addEventListener('click', (evt) => showPopup(evt, popupNewCard));
popupNewCardCloseButton.addEventListener('click', (evt) => hidePopup(evt, popupNewCard));
popupEditProfileCloseButton.addEventListener('click', (evt) => hidePopup(evt, popupEditProfile));
popupEditProfileCloseButton.addEventListener('click', (evt) => hidePopup(evt, popupImage));
document.addEventListener('click', (evt) => hidePopup(evt, popupNewCard));
document.addEventListener('click', (evt) => hidePopup(evt, popupEditProfile));
document.addEventListener('click', (evt) => hidePopup(evt, popupImage));
document.addEventListener('keydown', (evt) => hidePopup(evt, popupNewCard));
document.addEventListener('keydown', (evt) => hidePopup(evt, popupEditProfile));
document.addEventListener('keydown', (evt) => hidePopup(evt, popupImage));





function saveCard(evt) {
    evt.preventDefault();
    initialCards.unshift({link: popupCardImageLink.value, name: popupNewCardName.value});
    let newCard = initialCards.at(0);
    let newCreatedCard = createCard(newCard.name, newCard.link, deleteCard, handleLike);
    placesList.insertBefore(newCreatedCard, placesList.firstChild);
    hidePopup(evt, popupNewCard);
    popupCardImageLink.value = "";
    popupNewCardName.value = "";
}

function saveProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupProfileTitle.value;
    profileDescription.textContent = popupProfileDescription.value;
    hidePopup(evt, popupEditProfile);
    popupProfileTitle.value = "";
    popupProfileDescription.value = "";
}

initialCards.forEach(card => placesList.append(createCard(card.name, card.link, deleteCard, handleLike)));
