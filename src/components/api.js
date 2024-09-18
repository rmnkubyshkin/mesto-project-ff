const TOKEN = '97b196fd-7e0c-4cfe-864d-aea1e8f81a13';
const COHORT_NAME = 'wff-cohort-23';

const BASE_URL = 'https://nomoreparties.co/v1';
const GET_USER = `${BASE_URL}/${COHORT_NAME}/users/me`;
const GET_CARDS = `${BASE_URL}/${COHORT_NAME}/cards`;
const EDIT_PROFILE = `${BASE_URL}/${COHORT_NAME}/users/me`;
const ADD_CARD = `${BASE_URL}/${COHORT_NAME}/cards`;
const DELETE_CARD = `${BASE_URL}/${COHORT_NAME}/cards/`; // add id card after slash
const PUT_LIKE = `${BASE_URL}/${COHORT_NAME}/cards/likes/cardId/`; // add id card after slash
const DELETE_LIKE = `${BASE_URL}/${COHORT_NAME}/cards/likes/cardId/`; // add id card after slash
const UPDATE_AVATAR = `${BASE_URL}/${COHORT_NAME}/users/me/avatar`;

const config = {
    headers: {
        authorization: TOKEN,
        'Content-Type': 'application/json'
    }
}

export const getCards = () => {
    return fetch(GET_CARDS, config)
        .then(res => res.json())
        .then((result) => {
            return result;
        }).catch((err) => {
            console.log(`${err} Ошибка. Запрос не выполнен`);
        });
}

export function getUser() {
    return fetch(GET_USER, config)
        .then(res => res.json())
        .then((result) => {
            return result;
        }).catch((err) => {
        console.log(`${err} Ошибка. Запрос не выполнен`);
    });
}

