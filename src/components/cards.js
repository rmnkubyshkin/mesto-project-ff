import {getCards, getUser} from "./api";
import {showImage, placesList} from "../index";
import {createCard} from "./card";
import {createProfile} from "./profile";
export const initialCards = [];


function isMeLikedCard(userOfLikeId, userId) {
    return userOfLikeId === userId;
}

function isMyCard(myId, userOfCardId) {
    return myId === userOfCardId;
}

export function initialLoadingPage() {
    Promise.all([getUser(), getCards()])
        .then(([user, cards]) => {
            createProfile(user);
            cards.forEach(singleCard => {
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
            });
        })
        .catch((err) => {
            console.log(`${err} Error. Promise.all is wrong!`);});
}