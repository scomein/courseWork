import {put, takeEvery, all, call, delay} from 'redux-saga/effects';
import {get, post} from '../middleware/api';
import * as events from '../components/app/events';
import {doGetStockHistory, runStockHistoryLoader} from '../actions/stocks';
import {doStartBuyTransaction, doStartSellTransaction} from '../actions/transaction';
import {doGetAccountInfo} from '../actions/account';
import {store} from '../store/index';
export function* authSaga(action) {
    try {
        const response = yield call(post, action.url, null, action.data);
        console.log(response);
        yield put({
            response: response,
            type: action.type + events.SUCCESS_EVENT,
            login: action.data.login
          });
    } catch (error) {
        yield put({
            type: action.type + events.FAIL_EVENT,
            error: error.message || 'Can not auth'
          });
    } finally {
        yield put({
            type: action.type + events.INPROCESS_EVENT,
            loading: false
        });
    }
}

export function* refreshTokenSaga(action) {
    try {
        const response = yield call(post, action.url, null, action.data);
        yield put({
            response: response,
            type: action.type + events.SUCCESS_EVENT,
          });
    } catch (error) {
        yield put({
            type: action.type + events.FAIL_EVENT,
            error: error.message || 'Can not refresh token data'
          });
    }
}

export function* getAccountSaga(action) {
    try {
        const response = yield call(get, action.url, action.accessToken, null);
        yield put({
            response: response,
            type: action.type + events.SUCCESS_EVENT,
            first: action.first
          });
    } catch (error) {
        yield put({
            type: action.type + events.FAIL_EVENT,
            error: error.message || 'Can not get account info',
            first: action.first
          });
    }
}

export function* getStocksSaga(action) {
    try {
        const response = yield call(get, action.url, action.accessToken, null);
        yield put({
            response: response,
            type: action.type + events.SUCCESS_EVENT,
          });
        
    } catch (error) {
        yield put({
            type: action.type + events.FAIL_EVENT,
            error: error.message || 'Can not get stocks'
          });
    }
}

export function* loaderHistoriesSaga(action) {
    if(action.timeoutId) {
        clearInterval(action.timeoutId);
    }

    yield put({
        type: action.type + events.SUCCESS_EVENT,
        timeoutId: 12
    });

    while(true) {
        for(let i = 0; i < action.stocks.length; i++) {
            console.log("get stockHistory for stockId #"+ action.stocks[i]);
            yield put(doGetStockHistory(action.accessToken, action.stocks[i]));
        }
        yield delay(10000);
    }
}

export function* getStockHistorySaga(action) {
    try {
        const response = yield call(get, action.url + '/' + action.stockId + '/history',
                                 action.accessToken, null);
        yield put({
            response: response,
            stockId: action.stockId,
            type: action.type + events.SUCCESS_EVENT,
          });
    } catch (error) {
        yield put({
            type: action.type + events.FAIL_EVENT,
            stockId: action.stockId,
            error: error.message || 'Can not get stock history'
          });
    }
}

export function* buyTransactionSaga(action) {
    try {
        const response = yield call(post, action.url, action.accessToken, action.data);
        yield put({
            response: response,
            type: action.type + events.SUCCESS_EVENT,
          });
        yield put(doGetAccountInfo(action.accessToken, false));
        yield put(doStartBuyTransaction(false));
    } catch (error) {
        yield put({
            type: action.type + events.FAIL_EVENT,
            error: error.message || 'Can not create buy transaction'
          });
    }
}

export function* sellTransactionSaga(action) {
    try {
        const response = yield call(post, action.url, action.accessToken, action.data);
        yield put({
            response: response,
            type: action.type + events.SUCCESS_EVENT,
          });
        yield put(doGetAccountInfo(action.accessToken, false));
        yield put(doStartSellTransaction(false));
    } catch (error) {
        yield put({
            type: action.type + events.FAIL_EVENT,
            error: error.message || 'Can not create sell transaction'
          });
    }
}

export function* getTransactionsHistorySaga(action) {
    try {
        const response = yield call(get, action.url, action.accessToken, null);
        yield put({
            response: response,
            type: action.type + events.SUCCESS_EVENT,
            first: action.first
          });
    } catch (error) {
        yield put({
            type: action.type + events.FAIL_EVENT,
            error: error.message || 'Can not get transactions',
            first: action.first
          });
    }
}


export function* authorizationSaga() {
    yield takeEvery(events.LOGIN, authSaga);
    yield takeEvery(events.REGISTRATION, authSaga);
    yield takeEvery(events.REFRESH_TOKEN, refreshTokenSaga);
}

export function* accountSaga() {
    yield takeEvery(events.GET_ACCOUNT_INFO, getAccountSaga);
}

export function* stocksSaga() {
    yield takeEvery(events.GET_STOCKS, getStocksSaga);
    yield takeEvery(events.GET_STOCK_HISTORY, getStockHistorySaga);
    yield takeEvery(events.START_STOCKS_HISTORY_LOADER, loaderHistoriesSaga);
}

export function* transactionSaga() {
    yield takeEvery(events.CREATE_SELL, sellTransactionSaga);
    yield takeEvery(events.CREATE_BUY, buyTransactionSaga);
    yield takeEvery(events.GET_TRANSACTION_HISTORY, getTransactionsHistorySaga);
}

export default function* rootSaga() {
    yield all([
        authorizationSaga(),
        accountSaga(),
        stocksSaga(),
        transactionSaga()
    ]);
}