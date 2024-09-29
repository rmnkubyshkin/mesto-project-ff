import {templateCard} from "../index";
import {putLike, deleteCardFromServer, deleteLike} from "./api";

export function createCard(
                        userId,
                        singleCard,
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

    singleCard.likes.forEach((userOfLike) => {
        if(isMeLikedCard(userOfLike._id, userId)) {
            cardLikeButton.classList.add('card__like-button_is-active');
        }
    });

    if(isMyCard(userId, singleCard.owner._id)){
        deleteButton.addEventListener('click', () => removeCard(card._id, card));
    } else {
        hideDeleteButton(deleteButton);
    }

    cardLikeNumber.textContent = singleCard.likes.length;

    cardLikeButton.addEventListener('click', (evt) => toggleLike(
            evt,
            singleCard._id,
            singleCard.likes.length,
            cardLikeNumber
    ));
    cardImage.addEventListener('click', () => showImg(cardImage, cardTitle));
    cardImage.src = singleCard.link;
    cardImage.classList.add('card__image');
    cardImage.alt = `Image of ${singleCard.name}`;
    cardTitle.textContent = singleCard.name;
    return card;
}

function isMeLikedCard(userOfLikeId, userId) {
    return userOfLikeId === userId;
}

function isMyCard(myId, cardOwnerId) {
    return myId === cardOwnerId;
}

export function deleteCard(cardId, card) {
    deleteCardFromServer(cardId)
        .then(() => {
            return card.remove();})
        .catch((error) => console.error(error));

}

export function hideDeleteButton(button) {
    return button.hidden = true;
}

export function handleLike(evt, idCard, numOfLikes, cardLikeNumberElement){
    const likeMethod = evt.target.classList.contains('card__like-button_is-active') ? deleteLike : putLike;
    likeMethod(idCard)
        .then((response) => {
            cardLikeNumberElement.textContent = response.likes.length;
            evt.target.classList.toggle('card__like-button_is-active');
        })
        .catch(err => console.log(err));
}