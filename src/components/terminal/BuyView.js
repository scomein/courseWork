import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../store/index';
import * as events from '../app/events';
import {doExecuteBuyTransaction} from '../../actions/transaction';
export class BuyView extends Component {


    handleBuyButtonClicked = (e) => {
        if(this.props.userAMount < this.props.stock.price) {
            return;
        }

        store.dispatch(doExecuteBuyTransaction(this.props.accessToken, this.props.stockId, this.state.amount));

    }

    handleChangeAmount = (e) => {
        this.setState({amount: e.target.value});
    }

    render() {
        return this.props.needView ? (<div className="BuyView">
            <img className="StockIcon" iconUrl={this.props.iconUrl} alt="icon"/>
            <p className="StockViewName">{this.props.name}</p>
            <input className="BuyAmount" onChange={this.handleChangeAmount}/>
            <button className="BuyButton" onClick={this.handleBuyButtonClicked}>buy</button>
        </div>) : (<div></div>);
    };
}

function mapStateToProps(state) {
    return {
        accessToken: state.logon.accessToken || state.registrated.accessToken,
        needView: state.startBuy.started,
        stockId: state.startBuy.stockId,
        name: state.startBuy.stockName,
        iconUrl: state.startBuy.iconUrl,
        userAMount: state.gottenAccountInfo.balance
    }
}

export default connect(mapStateToProps)(BuyView);