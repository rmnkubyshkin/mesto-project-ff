import {getCards, getUser} from "./api";
import {showImage, placesList} from "../index";
import {createCard, deleteCard, handleLike} from "./card";
export const initialCards = [];

export function fillInitialCards() {
    getUser()
        .then((user) => {
            return user;
        })
        .then((user) => {
            getCards()
                .then((result) => {
                    result.forEach((card) => {
                        initialCards.push(
                            {
                                "_id": card._id,
                                "name": card.name,
                                "link": card.link,
                                "likes": card.likes,
                                "owner": {
                                    "_id": card.owner._id,
                                    "name": card.name,
                                    'about': card.about
                                }
                            }
                        );
                    });
                })
                .then(() => {
                    initialCards.forEach(singleCard => {
                        let deleteSingleCard;
                        if (user._id === singleCard.owner._id) {
                            deleteSingleCard = deleteCard;
                        } else {
                            deleteSingleCard = false;
                        }
                        const newCard = createCard(
                            singleCard._id,
                            singleCard.name,
                            singleCard.link,
                            singleCard.likes,
                            handleLike,
                            showImage,
                            deleteSingleCard,
                        );
                        placesList.append(newCard);
                    });
                    return initialCards;
                })
                .catch((err) => {
                    console.log(`${err} Ошибка. Карточки не найдены`);
                });
        })
        .catch((err) => {
            console.log(`${err} Ошибка. Карточки не найдены`);
        });
}