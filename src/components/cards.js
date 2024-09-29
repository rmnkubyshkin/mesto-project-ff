import {getCards, getUser} from "./api";
import {showImage, placesList} from "../index";
import {createCard, deleteCard, handleLike} from "./card";
import {createProfile} from "./profile";

export function initialLoadingPage() {
    Promise.all([getUser(), getCards()])
        .then(([user, cards]) => {
            createProfile(user);
            cards.forEach(singleCard => {
                const newCard = createCard(
                    user._id,
                    singleCard,
                    handleLike,
                    showImage,
                    deleteCard,
                );
                placesList.append(newCard);
            });
        })
        .catch((err) => {
            console.log(`${err} Error. Promise.all is wrong!`);});
}