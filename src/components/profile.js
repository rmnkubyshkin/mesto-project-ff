import {getUser, updateAvatar} from "./api";
import {
    profileDescription,
    profileTitle,
    profileImage,
    popupAvatar,
    popupAvatarLink,
    popupAvatarCloseButton,
    popupAvatarSubmit,
    popupAvatarInput, popupAvatarButtonSubmit
} from "../index";
import {hidePopup, showPopup} from "./modal";

export function createProfile(user) {
    profileDescription.textContent = user.about;
    profileTitle.textContent = user.name;
    profileImage.style.backgroundImage =  `url(${user.avatar})`;
    profileImage.alt = "Аватар пользователя";
}


export function editProfileAvatar() {
    popupAvatarLink.value = "";
    showPopup(popupAvatar);
    popupAvatarSubmit.addEventListener('click', (evt) => saveProfileAvatar(evt, popupAvatarLink));
}

function saveProfileAvatar(evt, popupAvatarInput) {
    popupAvatarButtonSubmit.textContent = 'Сохранить...';
    evt.preventDefault();
    updateAvatar(popupAvatarInput.value)
        .then((res) => {
        profileImage.style.backgroundImage =  `url(${res.avatar})`;
        hidePopup(popupAvatar);
        popupAvatarLink.value = "";})
        .catch((error) => console.error(error))
        .finally(() => {
            popupAvatarButtonSubmit.textContent = 'Сохранить';
        });


}