import * as Events from  '../components/app/events'

export const doLogin = (login, password) => (
    {
        type: Events.LOGIN,
        data: { login, password },
        url: '/api/auth/signin',
        method: 'post',
    });
export const doRegistration = (login, password) => (
    {
        type: Events.REGISTRATION,
        data: { login, password },
        url: '/api/auth/signup',
        method: 'post'
    });
export const updateToken = (refreshToken) => (
    {
        type: Events.REFRESH_TOKEN,
        data: { refreshToken },
        url: '/api/auth/refresh', 
        method: 'post'
    });