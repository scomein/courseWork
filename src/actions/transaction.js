import * as Events from  '../components/app/events'

export const doStartBuyTransaction = (started, stockId, name, iconUrl) => (
    {
        type: Events.CREATE_BUY,
        started: started,
        stockId: stockId,
        stockName: name,
        iconUrl:iconUrl
    });

export const doStartSellTransaction = (started, stockId, name, iconUrl) => (
    {
        type: Events.CREATE_SELL,
        started: started,
        stockId: stockId,
        stockName: name,
        iconUrl:iconUrl
    });


export const doExecuteBuyTransaction = (accessToken, stockId, amount) => (
    {
        type: Events.CREATE_BUY,
        accessToken: accessToken,
        id: stockId,
        amount:amount,
        url: '/api/transaction/buy'
    });

export const doExecuteSellTransaction = (accessToken, stockId, count) => (
    {
        type: Events.CREATE_SELL,
        accessToken: accessToken,
        id: stockId,
        count:count,
        url: '/api/transaction/sell'
    });

export const doGetTransactionsHistory = (accessToken, first) => (
    {
        type: Events.GET_TRANSACTION_HISTORY,
        accessToken: accessToken,
        url: '/api/transaction/history',
        first: first
    });