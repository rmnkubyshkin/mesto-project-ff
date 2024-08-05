// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCardWithTitleAndImageLink(titleCard, imageCardLink, removeCard) {
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
    placesList.append(card);
    return card;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
    return card;
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => createCardWithTitleAndImageLink(card.name, card.link, deleteCard));

