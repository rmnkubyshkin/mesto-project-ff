import {templateCard} from "../index";
import {putLike, deleteCardFromServer, deleteLike, getUser} from "./api";

export function createCard(cardId,
                           titleCard,
                           imageCardLink,
                           cardLikes,
                           toggleLike,
                           showImg,
                           removeCard){
    const card = templateCard.querySelector('.card').cloneNode(true);
    const cardDescription = card.querySelector('.card__description');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = cardDescription.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const cardLikeGroup = cardDescription.querySelector('.card__like');
    const cardLikeButton = cardLikeGroup.querySelector('.card__like-button');
    const cardLikeNumber = cardLikeGroup.querySelector('.card__like-number');

    if (removeCard !== false && cardId !== false) {
        deleteButton.addEventListener('click', () => removeCard(cardId, card));
    } else {
        hideDeleteButton(deleteButton);
    }
    cardLikeNumber.textContent = cardLikes.length;

    if (toggleLike) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    cardLikeButton.addEventListener('click', (evt) => handleLike(
            evt,
            cardId,
            cardLikes.length,
            cardLikeNumber
    ));
    cardImage.addEventListener('click', () => showImg(cardImage, cardTitle));
    cardImage.src = imageCardLink;

    cardImage.classList.add('card__image');
    cardImage.alt = `Image of ${titleCard}`;
    cardTitle.textContent = titleCard;
    return card;
}

export function deleteCard(cardId, card) {
    deleteCardFromServer(cardId)
        .then(() => {
            return card.remove();
        })
        .catch((error) => console.error(error));

}

export function hideDeleteButton(button) {
    return button.hidden = true;
}

export function handleLike(evt, idCard, numOfLikes, cardLikeNumberElement){

   if (evt.target.classList.contains('card__like-button_is-active')) {
       deleteLike(idCard).then((response) => {
               cardLikeNumberElement.textContent = response.likes.length;
               evt.target.classList.remove('card__like-button_is-active');
           }
       );
   } else {
       putLike(idCard).then((response) => {
               cardLikeNumberElement.textContent = response.likes.length;
               evt.target.classList.add('card__like-button_is-active');
           }
       );
   }
}