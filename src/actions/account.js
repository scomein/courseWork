import * as Events from  '../components/app/events'

export const doGetAccountInfo = (accessToken, first) => (
    {
        type: Events.GET_ACCOUNT_INFO,
        accessToken: accessToken,
        url: '/api/account/info',
        first: first
    });