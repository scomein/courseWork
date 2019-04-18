import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../store/index';
import { doGetAccountInfo} from '../../actions/account';
import {runStockHistoryLoader, doGetStocks} from '../../actions/stocks';
import { Preloader } from '../Preloader';
import * as events from '../app/events';

class TerminalHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: props.login,
            accessToken: props.accessToken,     
            error: props.error,
            clickedAccount: false
        }
        if(props.first !== false) {
            store.dispatch({type: events.GET_ACCOUNT_INFO + events.INPROCESS_EVENT, loading:true});
            store.dispatch(doGetAccountInfo(this.props.accessToken, props.first !== false));    
            store.dispatch({type: events.GET_STOCKS + events.INPROCESS_EVENT, loading:true});
            store.dispatch(doGetStocks(this.props.accessToken));
        }
        if(props.stocks.length > 0) {
            store.dispatch(runStockHistoryLoader(this.props.accessToken, this.props.stocks, this.props.timeoutId));
        }
        
    }

    handleOpenAccountInfo = (e) => {
        store.dispatch({type: events.OPEN_ACCOUNT_INFO_VIEW, visible: this.props.needViewAccount});
    }

    handleOpenTransactionHistory = (e) => {
        store.dispatch({type: events.OPEN_TRANSACTION_HISTORY_VIEW, visible: this.props.needViewTransactionHistory});
    }

    render() {
        if(this.props.stocks.length > 0 && !this.props.timeoutId) {
            store.dispatch(runStockHistoryLoader(this.props.accessToken, this.props.stocks, this.props.timeoutId));
        }
        return (
          <div className="TerminalHeader">
              <div className="CompanyIcon"></div>
              <p className="BalanceContainer">Balance: <div className="BalanceValueContainer">{this.props.loading ? <Preloader/> : (this.props.balance + '$')}</div></p>
              <div className="rightPanel">
              <button className="TransactionHistoryContainer" onClick={this.handleOpenTransactionHistory}>transactions</button>
              <button className="LoginContainer" onClick={this.handleOpenAccountInfo}>{this.props.login} </button>
              </div>
          </div>
        )
      };
}

function mapStateToProps(state) {
    return {
        login: state.gottenAccountInfo.name || state.logon.login || state.registrated.login,
        accessToken: state.logon.accessToken || state.registrated.accessToken,
        balance: state.gottenAccountInfo.balance,
        accountData: {
            balanse: state.gottenAccountInfo.balance,
            name: state.gottenAccountInfo.name,
            stocks: state.gottenAccountInfo.stocks || []
        },
        stocks: state.gottenStocks.stocks || [],
        loading: state.gottenAccountInfo.loading,
        first: state.gottenAccountInfo.first,
        needViewAccount: state.openAccountView.visible,
        needViewTransactionHistory: state.openTransactionHistoryView.visible,
        timeoutId: state.runningLoadingStockHistory.timeoutId
    }
}

export default connect(mapStateToProps)(TerminalHeader);
