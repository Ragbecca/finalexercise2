import axios from "axios";
import { parseJwt } from "../misc/Helpers";

export function authenticate(username, password) {
    return instance.post('/auth/login', { username, password }, {
        headers: { 'Content-type': 'application/json' }
    })
}

export function signup(user) {
    return instance.post('/auth/signup', user, {
        headers: { 'Content-type': 'application/json' }
    })
}

export function addCategory(user, category) {
    return instance.post(`/api/admin/add/category`, category, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

export function deleteCategory(user, categoryId) {
    return instance.post(`/api/admin/delete/category`, categoryId, {
        headers: {
            'Authorization': bearerAuth(user),
            'Content-type': 'application/json;charset=UTF-8'
        }
    })
}

export function changeStatusTaskToTrue(user, taskId) {
    return instance.post(`/api/tasks/status/done`, taskId, {
        headers: {
            'Authorization': bearerAuth(user),
            'Content-type': 'application/json;charset=UTF-8'
        }
    })
}

export function changeStatusTaskToFalse(user, taskId) {
    return instance.post(`/api/tasks/status/undone`, taskId, {
        headers: {
            'Authorization': bearerAuth(user),
            'Content-type': 'application/json;charset=UTF-8'
        }
    })
}

export function deleteTask(user, taskId) {
    return instance.post(`/api/tasks/delete`, taskId, {
        headers: {
            'Authorization': bearerAuth(user),
            'Content-type': 'application/json;charset=UTF-8'
        }
    })
}

export function addClickToWebsite(user, websiteId) {
    return instance.get(`/api/websites/clicks/${websiteId}`, {
        headers: {
            'Authorization': bearerAuth(user),
        }
    })
}

export function getQuotesUser(user, username) {
    return instance.get(`/api/quote/user/${username}`, {
        headers: {
            'Authorization': bearerAuth(user),
        }
    })
}

export function getQuoteTodayUser(user, username) {
    return instance.get(`/api/quote/today/user/${username}`, {
        headers: {
            'Authorization': bearerAuth(user),
        }
    })
}

export function getUserInfo(user, username) {
    return instance.post(`/api/userinfo/info`, username, {
        headers: {
            'Authorization': bearerAuth(user)
        }
    })
}

export function addTask(user, task) {
    return instance.post(`/api/tasks/add`, task, {
        headers: {
            'Authorization': bearerAuth(user)
        }
    })
}

export function editTask(user, task) {
    return instance.post(`/api/tasks/edit`, task, {
        headers: {
            'Authorization': bearerAuth(user)
        }
    })
}

export function addQuote(user, quote) {
    return instance.post(`/api/quote/add`, quote, {
        headers: {
            'Authorization': bearerAuth(user)
        }
    })
}

export function deleteQuote(user, quoteId) {
    return instance.post(`/api/quote/delete`, quoteId, {
        headers: {
            'Authorization': bearerAuth(user),
            'Content-type': 'application/json;charset=UTF-8'
        }
    })
}

export function numberOfUsers() {
    return instance.get('/public/numberOfUsers')
}

export function getUsers(user, username) {
    const url = username ? `/api/admin/users/${username}` : '/api/admin/users'
    return instance.get(url, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

export function deleteUser(user, username) {
    return instance.delete(`/api/users/${username}`, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

export function getTasksUser(user, username) {
    return instance.get(`/api/tasks/${username}`, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

export function getWebsitesUser(user, username) {
    return instance.get(`/api/websites/user/${username}`, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

export function getTaskCategories(user) {
    return instance.get(`/api/tasks/categories`, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

export function addWebsite(user, website) {
    return instance.post('/api/websites/add', website, {
        headers: {
            'Authorization': bearerAuth(user),
            'Content-type': 'application/json'
        }
    })
}


const instance = axios.create({
    baseURL: `http://localhost:8080/`
});

instance.interceptors.request.use(function (config) {
    if (config.headers.Authorization) {
        const token = config.headers.Authorization.split(' ')[1]
        const data = parseJwt(token)
        if (Date.now() > data.exp * 1000) {
            window.location.href = "/login";
            localStorage.clear();
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})


function bearerAuth(user) {
    return `Bearer ${user.accessToken}`
}