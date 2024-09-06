import './index.css';
import {initialCards} from "./components/cards";
import {showPopup, hidePopup} from './components/modal';
import {deleteCard,handleLike ,createCard} from "./components/card";

//General elements
export const templateCard = document.querySelector("#card-template").content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const profile = content.querySelector('.profile');

//Profile elements
const profileInfo = profile.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
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
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileContent = popupEditProfile.querySelector('.popup__content');
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

//EventListeners
profileAddButton.addEventListener('click', addCard);
profileEditButton.addEventListener('click', editProfile);

function showImage(cardImage, cardTitle) {
    popupImageSource.src = cardImage.src;
    popupImageSource.alt = cardImage.alt;
    popupCaptionSource.textContent = cardTitle.textContent;
    showPopup(popupImage);
    popupImage.addEventListener('click', () => hidePopup(popupNewCard));
}

function addCard() {
    showPopup(popupNewCard);
    popupNewCard.addEventListener('submit', saveCard);
    popupNewCardCloseButton.removeEventListener('click', () => hidePopup(popupNewCard));
}

function editProfile() {
    showPopup(popupEditProfile);
    popupProfileTitle.value = profileTitle.textContent;
    popupProfileDescription.value = profileDescription.textContent;
    popupEditForm.addEventListener('submit', saveProfile);
    popupEditProfileCloseButton.removeEventListener('click', () => hidePopup(popupEditProfile));
}

function saveCard(evt) {
    evt.preventDefault();
    const newCreatedCard = createCard(popupNewCardName.value, popupCardImageLink.value, deleteCard, handleLike, showImage);
    placesList.prepend(newCreatedCard);
    popupNewCardForm.reset();
    hidePopup(popupNewCard);

}

function saveProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupProfileTitle.value;
    profileDescription.textContent = popupProfileDescription.value;
    hidePopup(popupEditProfile);
    popupProfileTitle.value = "";
    popupProfileDescription.value = "";
}

initialCards.forEach(card => placesList.append(createCard(card.name, card.link, deleteCard, handleLike, showImage)));
