import axios from "./axios";

export function testCall() {
    return axios.get('/test');
};

export const login = (user) => {
    return axios.post('/login', {}, { auth: user });
};

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        axios.defaults.headers.common['Authorization'] = `Basic ${btoa(
            username + ':' + password
        )}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};