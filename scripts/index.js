// @todo: Темплейт карточки

const cardList = [
    {
        "image": "../images/octopus.jpg",
        "title": "Octopus"
    },
    {
        "image": "../images/fish-with-lush-tail.jpg",
        "title": "Fish with lush tail"
    },
    {
        "image": "../images/blue-fish.jpg",
        "title": "Blue fish"
    },
    {
        "image": "../images/jellyfish.jpg",
        "title": "Jellyfish"
    },
    {
        "image": "../images/sea-horse.jpg",
        "title": "Sea horse"
    },
    {
        "image": "../images/aggregation-of-fish.jpg",
        "title": "Fish aggregation"
    },


];


// @todo: DOM узлы
const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const profileAddButton = profile.querySelector('.profile__add-button');
const placesList = content.querySelector('.places__list');
const templateCard = document.querySelector("#card-template").content;

//profileAddButton.addEventListener('click', () => createCardWithTemplate());
profileAddButton.addEventListener('click', () => showPopup());

function showPopup() {
    const popup = document.querySelector('.popup_type_new-card');
    popup.classList.add('popup_is-opened');
}

// @todo: Функция создания карточки
function addCardViaButton() {
    showPopup();
    //get infos from inputs

    //send infos to createCard method
}

function createCardWithTemplate(titleCard, imageCardLink) {
    const card = templateCard.querySelector('.card').cloneNode(true);
    const cardDescription = card.querySelector('.card__description');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = cardDescription.querySelector('.card__title');
    cardImage.src = imageCardLink;
    cardImage.classList.add('.card__image');
    cardImage.alt = `Image of ${titleCard}`;
    cardTitle.textContent = titleCard;
    placesList.append(card);
    console.log(titleCard, imageCardLink);
    return deleteCard(card);
}
// @todo: Функция удаления карточки
function deleteCard(card) {

}
// @todo: Вывести карточки на страницу
cardList.forEach( card => createCardWithTemplate(card.title, card.image));
showPopup();
