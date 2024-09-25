const TOKEN = '97b196fd-7e0c-4cfe-864d-aea1e8f81a13';
const COHORT_NAME = 'wff-cohort-23';
const BASE_URL = 'https://nomoreparties.co/v1';

const GET_USER = `${BASE_URL}/${COHORT_NAME}/users/me`;
const GET_CARDS = `${BASE_URL}/${COHORT_NAME}/cards`;
const UPDATE_PROFILE = `${BASE_URL}/${COHORT_NAME}/users/me`;
const ADD_CARD = `${BASE_URL}/${COHORT_NAME}/cards`;
const DELETE_CARD = `${BASE_URL}/${COHORT_NAME}/cards`;
const PUT_LIKE = `${BASE_URL}/${COHORT_NAME}/cards/likes`;
const DELETE_LIKE = `${BASE_URL}/${COHORT_NAME}/cards/likes`;
const UPDATE_AVATAR = `${BASE_URL}/${COHORT_NAME}/users/me/avatar`;

const myHeaders = new Headers();
myHeaders.append("Authorization", TOKEN);
myHeaders.append("Content-Type", "application/json");

export function getCards() {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    return fetch(GET_CARDS, requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((error) => console.error(error));
}

export function getUser() {
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    return fetch(GET_USER, requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((error) => console.error(error));
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
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((error) => console.error(error));
}

export function addCardToServer(name, link) {
    const raw = JSON.stringify({
        "name": name,
        "link": link
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    return fetch(ADD_CARD, requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((error) => console.error(error));
}

export function deleteCardFromServer(id) {
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
    };
    return fetch(`${DELETE_CARD}/${id}`, requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).catch((error) => console.error(error));
}

export function putLike(id) {
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
    };
    return fetch(`${PUT_LIKE}/${id}`, requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).catch((error) => console.error(error));
}

export function deleteLike(id) {
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
    };
    return fetch(`${DELETE_LIKE}/${id}`, requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((error) => console.error(error));
}

export function updateAvatar(avatar) {
    const raw = JSON.stringify({
        "avatar" : avatar
    });

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
    };

    return fetch(UPDATE_AVATAR, requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((error) => console.error(error));
}
