import * as events from '../components/app/events'
const defaultState = {};
const parseSuccess = (action, state) => {
    return Object.assign({
        login: action.login,
        accessToken: action.response.accessToken,
        refreshToken: action.response.refreshToken,
        authLoading: false
    }, state);
};
const parseFail = (action, state) => Object.assign({
    authError: action.error,
    authLoading: false
    }, state);

const parseAuthLoading = (action, state) =>  ({authLoading: action.loading});

export const convertState = (action, type, builder, state) => {
    if(action.type !== type) {
        return state;
    }
    return builder(action, state);
}

export const logon = (state = defaultState, action) => convertState(action, 
    events.LOGIN + events.SUCCESS_EVENT, parseSuccess, state)

export const loginFailed = (state = defaultState, action) => convertState(action, 
    events.LOGIN + events.FAIL_EVENT, parseFail, state)

export const registrated = (state = defaultState, action) => convertState(action,
    events.REGISTRATION + events.SUCCESS_EVENT, parseSuccess, state)

export const registrationFailed = (state = defaultState, action) => convertState(action,
    events.REGISTRATION + events.FAIL_EVENT, parseFail, state)

export const logonLoading = (state = defaultState, action) => convertState(action, 
    events.LOGIN + events.INPROCESS_EVENT, parseAuthLoading, state)

export const registrationLoading = (state = defaultState, action) => convertState(action, 
        events.REGISTRATION + events.INPROCESS_EVENT, parseAuthLoading, state)
    

export default {logon, loginFailed, registrated, registrationFailed}