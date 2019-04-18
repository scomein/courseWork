import * as events from '../components/app/events';
import { convertState } from './authorization';
const defaultState = {};
const parseSuccess = (action, state) => {
    return {
        login: action.response.name,
        balance: action.response.balance,
        stocks: action.response.stocks,
        first: action.first
    };
};
const parseFail = (action, state) => Object.assign({
    getAccountInfoError: action.error
    }, state);

const parseLoading = (action, state) =>  ({loading: action.loading});

export const gottenAccountInfo = (state = defaultState, action) => convertState(action, 
    events.GET_ACCOUNT_INFO + events.SUCCESS_EVENT, parseSuccess, state);

export const failGetAccountInfo = (state = defaultState, action) => convertState(action, 
    events.GET_ACCOUNT_INFO + events.FAIL_EVENT, parseFail, state);

export const loadingGetAccountInfo = (state = defaultState, action) => convertState(action, 
    events.GET_ACCOUNT_INFO + events.INPROCESS_EVENT, parseLoading, state);

export const openAccountView = (state = defaultState, action) => {
    return action.type === events.OPEN_ACCOUNT_INFO_VIEW ? 
        {visible: !action.visible} :
        state;
}

export default {gottenAccountInfo, failGetAccountInfo, loadingGetAccountInfo, openAccountView};