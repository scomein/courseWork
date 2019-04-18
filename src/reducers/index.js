import { combineReducers } from 'redux';
import {logon, loginFailed, registrated, registrationFailed, logonLoading, registrationLoading} from './authorization';
import {gottenAccountInfo, failGetAccountInfo, loadingGetAccountInfo, openAccountView} from './account';
import {gottenStocks, failGetStocks, gottenStockHistory, failGetStockHistory, runningLoadingStockHistory} from './stocks';
import {gottenTransactionHistory, failGetTransactionHistory, startBuy, startSell, openTransactionHistoryView} from './transactions';
const rootReducer = combineReducers({
    logon, loginFailed, registrated, registrationFailed, logonLoading, registrationLoading,
    gottenAccountInfo, failGetAccountInfo, loadingGetAccountInfo, openAccountView,
    gottenStocks, failGetStocks, gottenStockHistory, failGetStockHistory, runningLoadingStockHistory,
    gottenTransactionHistory, failGetTransactionHistory, startBuy, startSell, openTransactionHistoryView
});
  
export default rootReducer;