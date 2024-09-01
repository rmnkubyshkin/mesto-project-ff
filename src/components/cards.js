import aggregationOfFish from '../images/aggregation-of-fish.jpg';
import blueFish from '../images/blue-fish.jpg';
import octopus from '../images/octopus.jpg';
import seaHorse from '../images/sea-horse.jpg';
import jellyfish from '../images/jellyfish.jpg';
import fishWithLushTail from '../images/fish-with-lush-tail.jpg';


export const initialCards = [
    {
        name: "Octopus",
        link: octopus,
    },
    {
        name: "Fish with lush tail",
        link: fishWithLushTail,
    },
    {
        name: "Blue fish",
        link: blueFish,
    },
    {
        name: "Jellyfish",
        link: jellyfish,
    },
    {
        name: "Sea horse",
        link: seaHorse,
    },
    {
        name: "Fish aggregation",
        link: aggregationOfFish,
    }
];
import {templateCard, popupImage} from "../index";
import {showPopup} from "./modal";



export function createCard(titleCard, imageCardLink, removeCard, toggleLike) {
    const card = templateCard.querySelector('.card').cloneNode(true);
    const cardDescription = card.querySelector('.card__description');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = cardDescription.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const profileLikeButton = cardDescription.querySelector('.card__like-button');
    const params = {
        "cardImage": cardImage,
        "cardTitle": cardTitle
    };

    deleteButton.addEventListener('click', () => removeCard(card));
    profileLikeButton.addEventListener('click', (evt) => toggleLike(evt));
    cardImage.addEventListener('click', (evt) => showPopup(evt, popupImage, params));

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