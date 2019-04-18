import * as events from '../components/app/events';
import { convertState } from './authorization';
import { bindActionCreators } from 'redux';
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

export const gottenTransactionHistory = (state = defaultState, action) => convertState(action, 
    events.GET_TRANSACTION_HISTORY + events.SUCCESS_EVENT, parseSuccess, state);

export const failGetTransactionHistory = (state = defaultState, action) => convertState(action, 
    events.GET_TRANSACTION_HISTORY + events.FAIL_EVENT, parseFail, state);

export const startSell = (state = defaultState, action) => {
    if(action.type === events.START_SELL) {
        return {started: action.started,
             stockId: action.stockId,
            stockName: action.stockName,
        iconUrl: action.iconUrl};
    }
    return state;
}

export const startBuy = (state = defaultState, action) => {
    if(action.type === events.START_BUY) {
        return {started: action.started, stockId: action.stockId,
            stockName: action.stockName,
        iconUrl: action.iconUrl};
    }
    return state;
}

export const openTransactionHistoryView = (state = defaultState, action) => {
    return action.type === events.OPEN_TRANSACTION_HISTORY_VIEW ? 
        {visible: !action.visible} :
        state;
}



