import {templateCard} from "../index";
import {addCardToServer} from "./api";

export function createCard(titleCard, imageCardLink, removeCard, toggleLike, showImg) {
    const card = templateCard.querySelector('.card').cloneNode(true);
    const cardDescription = card.querySelector('.card__description');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = cardDescription.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const profileLikeButton = cardDescription.querySelector('.card__like-button');
    addCardToServer(titleCard, imageCardLink);
    deleteButton.addEventListener('click', () => removeCard(card));
    profileLikeButton.addEventListener('click', (evt) => toggleLike(evt));
    cardImage.addEventListener('click', () => showImg(cardImage, cardTitle));
    cardImage.src = imageCardLink;
    cardImage.classList.add('card__image');
    cardImage.alt = `Image of ${titleCard}`;
    cardTitle.textContent = titleCard;
    return card;
}

export function deleteCard(card) {
    card.remove();
    return card;
}

export function handleLike(evt){
    return evt.target.classList.toggle('card__like-button_is-active');
}