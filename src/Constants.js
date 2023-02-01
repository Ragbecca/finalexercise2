const prod = {
    url: {
        API_BASE_URL: '',
        OAUTH2_REDIRECT_URI: ''
    }
}

const dev = {
    url: {
        API_BASE_URL: 'http://localhost:8080',
        OAUTH2_REDIRECT_URI: 'http://localhost:3000/login/redirect'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod