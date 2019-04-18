import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../store/index';
import * as events from '../app/events';
import {doExecuteSellTransaction} from '../../actions/transaction';

export class SellView extends Component {

    handleSellButtonClicked = (e) => {
        if(this.props.count === 0) {
            return;
        }
        store.dispatch(doExecuteSellTransaction(this.props.accessToken, this.props.stockId, this.state.count));
    }

    handleChangeAmount = (e) => {
        this.setState({count: e.target.value});
    }

    render() {
        return this.props.needView ? ( <div className="SellView">
            <img className="StockIcon" iconurl={this.props.iconUrl} alt="icon"/>
            <p className="StockViewName">{this.props.name}</p>
                <input className="SellCount" onChange={this.handleChangeAmount}/>
                <button className="SellButton" onClick={this.handleSellButtonClicked}>sell</button>
        </div>) : (<div></div>);
    };
}

function mapStateToProps(state) {
    return {
        accessToken: state.logon.accessToken || state.registrated.accessToken,
        needView: state.startSell.started,
        stockId: state.startSell.stockId,
        name: state.startSell.stockName,
        iconUrl: state.startSell.iconUrl
    }
}

export default connect(mapStateToProps)(SellView);