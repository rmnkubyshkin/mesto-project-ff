const TOKEN = '97b196fd-7e0c-4cfe-864d-aea1e8f81a13';
const COHORT_NAME = 'wff-cohort-23';

const BASE_URL = 'https://nomoreparties.co/v1';
const GET_USER = `${BASE_URL}/${COHORT_NAME}/users/me`;
const GET_CARDS = `${BASE_URL}/${COHORT_NAME}/cards`;
const UPDATE_PROFILE = `${BASE_URL}/${COHORT_NAME}/users/me`;
const ADD_CARD = `${BASE_URL}/${COHORT_NAME}/cards`;
const DELETE_CARD = `${BASE_URL}/${COHORT_NAME}/cards/`; // add id card after slash
const PUT_LIKE = `${BASE_URL}/${COHORT_NAME}/cards/likes/cardId/`; // add id card after slash
const DELETE_LIKE = `${BASE_URL}/${COHORT_NAME}/cards/likes/cardId/`; // add id card after slash
const UPDATE_AVATAR = `${BASE_URL}/${COHORT_NAME}/users/me/avatar`;

const myHeaders = new Headers();
myHeaders.append("Authorization", "97b196fd-7e0c-4cfe-864d-aea1e8f81a13");
myHeaders.append("Content-Type", "application/json");

export const getCards = () => {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    return fetch(GET_CARDS, requestOptions)
        .then(res => res.json())
        .then((result) => {
            return result;
        }).catch((error) => console.error(error));
}

export function getUser() {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    return fetch(GET_USER, requestOptions)
        .then(res => res.json())
        .then((result) => {
            return result;
        }).catch((error) => console.error(error));
}


export function saveProfileAtServer(name, about) {
    const raw = JSON.stringify({
        "name": name,
        "about": about
    });

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(UPDATE_PROFILE, requestOptions)
    .then((response) => {return response;})
    .catch((error) => console.error(error));
}

