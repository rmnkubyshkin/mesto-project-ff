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
import {templateCard} from "../index";

export function createCard(titleCard, imageCardLink, removeCard) {
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

export function deleteCard(card) {
    card.remove();
    return card;
}
