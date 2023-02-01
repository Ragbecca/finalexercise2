import { config } from "../Constants"

export function parseJwt(token) {
    if (!token) { return }
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
}

export function getSocialLoginUrl(name) {
    return `${config.url.API_BASE_URL}/oauth2/authorization/${name}?redirect_uri=${config.url.OAUTH2_REDIRECT_URI}`
}

export const handleLogError = (error) => {
    if (error.response) {
        console.log(error.response.data);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log(error.message);
    }
}

export function getBase64Image(img, imgCode) {
    fetch(img.src)
        .then((res) => res.blob())
        .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                localStorage.setItem(imgCode, reader.result);
            };
            reader.readAsDataURL(blob);
        });
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}