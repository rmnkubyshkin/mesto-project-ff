import {getCards} from "./api";
import {showImage, placesList} from "../index";
import {createCard, deleteCard, handleLike} from "./card";
export const initialCards = [];


export function fillInitialCards() {
    getCards()
        .then((result) => {
            result.forEach((card) => {
                initialCards.push(
                    {
                        "name" : card.name,
                        "link" : card.link
                    }
                );
            });
        })
        .then(()=> {
            initialCards.forEach(card =>  {
                placesList.append(createCard(card.name, card.link, deleteCard, handleLike, showImage))
            });
        })
        .catch((err) => {
            console.log(`${err} Ошибка. Карточки не найдены`);
        });
}