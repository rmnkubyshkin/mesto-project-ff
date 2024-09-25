import {getUser, saveProfileAtServer, updateAvatar} from "./api";
import {
    profileDescription,
    profileTitle,
    profileImage,
    popupAvatar,
    popupAvatarLink,
    popupAvatarCloseButton,
    popupAvatarSubmit,
    popupAvatarInput
} from "../index";
import {hidePopup, showPopup} from "./modal";

export function createProfile() {
    getUser().then((profile) => {
        profileDescription.textContent = profile.about;
        profileTitle.textContent = profile.name;
        profileImage.style.backgroundImage =  `url(${profile.avatar})`;
        profileImage.alt = "Аватар пользователя";
    })
    .catch((err) => {
        console.log(`${err} Ошибка. Пользователь не найден`);
    });
}


export function editProfileAvatar() {
    popupAvatarLink.value = "";
    showPopup(popupAvatar);
    popupAvatarSubmit.addEventListener('click', (evt) => saveProfileAvatar(evt, popupAvatarLink));
}

function saveProfileAvatar(evt, popupAvatarInput) {
    evt.preventDefault();
    updateAvatar(popupAvatarInput.value).then((res) => {
        profileImage.style.backgroundImage =  `url(${res.avatar})`;
        hidePopup(popupAvatar);
        popupAvatarLink.value = "";
    })


}