import './index.css';
import {initialCards, createCard, deleteCard, handleLike} from './components/cards';
import {hidePopup, showPopup} from './components/modal';

//General elements
export const templateCard = document.querySelector("#card-template").content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const profile = content.querySelector('.profile');

//Popup elements of adding card
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardContent = popupNewCard.querySelector('.popup__content');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close');
const popupNewCardForm = popupNewCardContent.querySelector('.popup__form');
const popupNewCardName = popupNewCardForm.querySelector('.popup__input_type_card-name');
const popupCardImageLink = popupNewCardForm.querySelector('.popup__input_type_url');

//Profile elements
const profileInfo = profile.querySelector('.profile__info');
export const profileTitle = profileInfo.querySelector('.profile__title');
export const profileDescription = profileInfo.querySelector('.profile__description');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');

//Popup elements of editing profile
export const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileContent = popupEditProfile.querySelector('.popup__content');
const popupEditProfileCloseButton = popupEditProfileContent.querySelector('.popup__close');
const popupEditForm = popupEditProfileContent.querySelector('.popup__form');
export const popupProfileTitle = popupEditForm.querySelector('.popup__input_type_name');
export const popupProfileDescription = popupEditForm.querySelector('.popup__input_type_description');

//EventListeners
popupEditForm.addEventListener('submit', saveProfile);
popupNewCardForm.addEventListener('submit', saveCard);
profileEditButton.addEventListener('click', () => showPopup(popupEditProfile));
profileAddButton.addEventListener('click', () => showPopup(popupNewCard));
popupNewCardCloseButton.addEventListener('click', (evt) => hidePopup(evt, popupNewCard));
popupEditProfileCloseButton.addEventListener('click', (evt) => hidePopup(evt, popupEditProfile));
document.addEventListener('click', (evt) => hidePopup(evt, popupNewCard));
document.addEventListener('click', (evt) => hidePopup(evt, popupEditProfile));
document.addEventListener('keydown', (evt) => hidePopup(evt, popupNewCard));
document.addEventListener('keydown', (evt) => hidePopup(evt, popupEditProfile));


function saveCard(evt) {
    evt.preventDefault();
    initialCards.unshift({link: popupCardImageLink.value, name: popupNewCardName.value});
    let newCard = initialCards.at(0);
    let newCreatedCard = createCard(newCard.name, newCard.link, deleteCard);
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
