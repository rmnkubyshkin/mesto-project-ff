import {getCards, getUser} from "./api";
import {showImage, placesList} from "../index";
import {createCard} from "./card";
export const initialCards = [];

function isMeLikedCard(userOfLikeId, userId) {
    let result = false;
    if (userOfLikeId === userId) {
        result = true;
    }
    return result;
}

function isMyCard(myId, userOfCardId) {
    let result = false;
    if (myId === userOfCardId) {
        result = true;
    }
    return result;
}

export function showCards() {
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
                        let meLikedCard = false;
                        let thisMyCard = isMyCard(user._id,singleCard.owner._id)
                        singleCard.likes.forEach((userOfLike) => {
                            meLikedCard = isMeLikedCard(userOfLike._id, user._id)
                        });
                        const newCard = createCard(
                            singleCard._id,
                            singleCard.name,
                            singleCard.link,
                            singleCard.likes,
                            meLikedCard,
                            showImage,
                            thisMyCard,
                        );
                        placesList.append(newCard);
                        return initialCards;
                    });
                })
                .catch((err) => {
                    console.log(`${err} Ошибка. Карточки не найдены`);
                });
        })
        .catch((err) => {
            console.log(`${err} Ошибка. Карточки не найдены`);
        });
}