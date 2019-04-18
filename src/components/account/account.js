import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AccountStock } from './accountStock'
import { store } from '../../store/index';
import { doGetAccountInfo } from '../../actions/account';

class Account extends Component {

    render() {
      if(this.props.visible) {
        store.dispatch(doGetAccountInfo(this.props.accessToken, false));
      };
        return this.props.visible ? (
          <div className="Account">
                { this.props.stocks.map((stock, index) => {
                  console.log(stock);
                  return <AccountStock stock={stock} key={stock.id || index}/>})
                }
          </div>
        ) : (<div></div>)
    };
}

function mapStateToProps(state) {
  return {
      balance: state.gottenAccountInfo.balance,
      login: state.gottenAccountInfo.name,
      stocks: state.gottenAccountInfo.stocks || [],
      first: state.gottenAccountInfo.first !== false,
      visible: state.openAccountView.visible
    }
}

export default connect(mapStateToProps)(Account);
