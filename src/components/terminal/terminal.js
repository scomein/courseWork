import React, { Component } from 'react';
import { connect } from 'react-redux';
import TerminalHeader from './TerminalHeader';
import Account from '../account/account';
import StocksContainer from '../stocks/StocksContainer';
import TransactionHistory from '../transaction/TransactionHistory';
class Terminal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: props.login,
            accessToken: props.accessToken,     
            error: props.error
        }
        
    }

    render() {
        return this.props.accessToken ? (
          <div className="Terminal">
            <TerminalHeader/>
            <Account/>
            <TransactionHistory/>
            <StocksContainer/>
          </div>
        ) :
        (<div></div>);
      };
}

function mapStateToProps(state) {
    return {
        login: state.logon.login || state.registrated.login,
        accessToken: state.logon.accessToken || state.registrated.accessToken    
    }
}

export default connect(mapStateToProps)(Terminal);
