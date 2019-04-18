import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../store/index';
import { doGetTransactionsHistory } from '../../actions/transaction';

class TransactionHistory extends Component {

    render() {
        store.dispatch(doGetTransactionsHistory(this.props.accessToken, false));
        return this.props.visible ? (
          <div className="TransactionHistory">
          </div>
        ) : (<div></div>)
    };
}

function mapStateToProps(state) {
    console.log("TransactionHistory");
    console.log(state);
  return {
      balance: state.gottenAccountInfo.balance,
      login: state.gottenAccountInfo.name,
      stocks: state.gottenAccountInfo.stocks || [],
      first: state.gottenAccountInfo.first !== false,
      visible: state.openTransactionHistoryView.visible
    }
}

export default connect(mapStateToProps)(TransactionHistory);
