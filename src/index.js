import './index.css';
import {initialCards} from './cards';

//General elements
const templateCard = document.querySelector("#card-template").content;
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
const popupSaveNewCardButton = popupNewCardForm.querySelector('.popup__button');

//Profile elements
const profileInfo = profile.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');

//Popup elements of editing profile
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileContent = popupEditProfile.querySelector('.popup__content');
const popupEditProfileCloseButton = popupEditProfileContent.querySelector('.popup__close');
const popupEditForm = popupEditProfileContent.querySelector('.popup__form');
const popupProfileTitle = popupEditForm.querySelector('.popup__input_type_name');
const popupProfileDescription = popupEditForm.querySelector('.popup__input_type_description');
const popupSaveProfileButton = popupEditForm.querySelector('.popup__button');

//EventListeners

document.addEventListener('click', (evt) => hidePopup(evt, popupNewCard));
document.addEventListener('click', (evt) => hidePopup(evt, popupEditProfile));

profileEditButton.addEventListener('click', () => showPopupEditProfile());
profileAddButton.addEventListener('click', () => showPopupNewCard());
popupNewCardCloseButton.addEventListener('click', (evt) => hidePopup(evt, popupNewCard));
popupEditProfileCloseButton.addEventListener('click', (evt) => hidePopup(evt, popupEditProfile));
popupSaveNewCardButton.addEventListener('click', (evt) => saveCard(evt));
popupSaveProfileButton.addEventListener('click', (evt) => saveProfile(evt));

document.addEventListener('keydown', (evt) => hidePopup(evt, popupNewCard));
document.addEventListener('keydown', (evt) => hidePopup(evt, popupEditProfile));



function saveCard(evt) {
    evt.preventDefault();
    initialCards.push({link: popupCardImageLink.value, name: popupNewCardName.value});
    let newCard = initialCards.at(-1);
    placesList.append(createCard(newCard.name, newCard.link, deleteCard));
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


function hidePopup(evt, popup) {
    if (evt.key === 'Escape') {
        document.removeEventListener('keydown', popup);
        popup.classList.remove('popup_is-opened');
    }
    if (evt.target.matches('.popup') || evt.target.matches('.popup__close') ||
        evt.target.matches('.popup__button')) {
        document.removeEventListener('click', popup);
        popup.classList.remove('popup_is-opened');
    }
}

function showPopupEditProfile() {
    popupProfileTitle.value = profileTitle.textContent;
    popupProfileDescription.value = profileDescription.textContent;
    return popupEditProfile.classList.add('popup_is-opened');
}

function showPopupNewCard() {
    return popupNewCard.classList.add('popup_is-opened');
}

function createCard(titleCard, imageCardLink, removeCard) {
    const card = templateCard.querySelector('.card').cloneNode(true);
    const cardDescription = card.querySelector('.card__description');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = cardDescription.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => removeCard(card));
    cardImage.src = imageCardLink;
    cardImage.classList.add('.card__image');
    cardImage.alt = `Image of ${titleCard}`;
    cardTitle.textContent = titleCard;
    return card;
}

function deleteCard(card) {
    card.remove();
    return card;
}

initialCards.forEach(card => placesList.append(createCard(card.name, card.link, deleteCard)));