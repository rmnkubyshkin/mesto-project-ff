import {getUser} from "./api";
import {profileDescription, profileTitle, profileImage} from "../index";

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
