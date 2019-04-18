import * as Events from  '../components/app/events'

export const doGetStocks = (accessToken) => (
    {
        type: Events.GET_STOCKS,
        accessToken: accessToken,
        url: '/api/stocks'
    });

export const doGetStockHistory = (accessToken, stockId) => (
    {
        type: Events.GET_STOCK_HISTORY,
        accessToken: accessToken,
        stockId: stockId,
        url: '/api/stocks'
    });

export const runStockHistoryLoader = (accessToken, stocks, timeoutId) => {
    return {
        type: Events.START_STOCKS_HISTORY_LOADER,
        accessToken: accessToken,
        stocks: stocks.map(s => s.id),
        timeoutId: timeoutId
    }
};
