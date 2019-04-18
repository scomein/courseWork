import * as events from '../components/app/events';
import { convertState } from './authorization';
const defaultState = {};
const parseSuccess = (action, state) => {
    return {
        login: action.response.name,
        balance: action.response.balance,
        stocks: action.response.items
    };
};
const parseFail = (action, state) => Object.assign({
    error: action.error
    }, state);

const parseLoading = (action, state) =>  ({loading: action.loading});

export const gottenStocks = (state = defaultState, action) => convertState(action, 
    events.GET_STOCKS + events.SUCCESS_EVENT, parseSuccess, state);

export const failGetStocks = (state = defaultState, action) => convertState(action, 
    events.GET_STOCKS + events.FAIL_EVENT, parseFail, state);

const historyState = {
    stockHistoryMap: new Map(),
    errorMap: new Map()
}
const mapResponseToHistoryData = (response) => {
    const labels = [];
    const data = [];
    response.items.forEach(element => {
        labels.push(element.date);
        data.push(element.price);
    });
    return {
        labels: labels,
        data: data
    }
}

const parseSuccessGetHistory = (action, state) => {
    const newState = {
        stockHistoryMap: new Map(state.stockHistoryMap),
        errorMap: new Map(state.errorMap)
    }
    newState.stockHistoryMap.set(action.stockId, mapResponseToHistoryData(action.response));
    return newState;
}

const parseFailGetStockHistory = (action, state) => {
    const newState = {
        stockHistoryMap: new Map(state.stockHistoryMap),
        errorMap: new Map(state.errorMap)
    }
    newState.errorMap.set(action.stockId, action.error);
    return newState;
}

export const gottenStockHistory = (state = historyState, action) => convertState(action,
    events.GET_STOCK_HISTORY + events.SUCCESS_EVENT, parseSuccessGetHistory, state);

export const failGetStockHistory = (state = historyState, action) => convertState(action,
    events.GET_STOCK_HISTORY + events.FAIL_EVENT, parseFailGetStockHistory, state);

const parseSuccessRunHistoryLoader = (action, state) => {
    return {
        timeoutId: action.timeoutId
    }
}

export const runningLoadingStockHistory = (state = {}, action) => convertState(action,
    events.START_STOCKS_HISTORY_LOADER + events.SUCCESS_EVENT, parseSuccessRunHistoryLoader, state);