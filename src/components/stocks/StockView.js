import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../store/index';
import { Preloader } from '../Preloader';
import * as events from '../app/events';
import {StockGraph} from './StockGraph';
import {doStartBuyTransaction, doStartSellTransaction} from '../../actions/transaction';
export class StockView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.stock.id,
            code: props.stock.code,
            name: props.stock.name,
            iconUrl: props.stock.iconUrl,
            price: props.stock.price,
            priceDelta: props.stock.priceDelta,
            history: props.history,
            error: props.error,
            count: props.count,
            userAMount: props.userAMount
        }
    }

    handleBuyButtonClicked = (e) => {
        if(this.userAMount < this.props.stock.price) {
            return;
        }
        store.dispatch(doStartBuyTransaction(true, this.props.id, this.props.name, this.props.iconUrl));
    }

    handleSellButtonClicked = (e) => {
        if(this.props.count === 0) {
            return;
        }
        store.dispatch(doStartSellTransaction(true, this.props.id, this.props.name, this.props.iconUrl));
    }

    render() {
        return <div className="StockView">
            <StockGraph stockId={this.props.id} stockHistory={this.props.history} error={this.props.error}/>
            <img className="StockIcon" iconUrl={this.props.iconUrl} alt="icon"/>
            <p className="StockViewName">{this.props.stock.name}</p>
            <div className="StockOperationsContainer">
                {this.props.loading ? <Preloader/> : <div></div> }
                <p className="StockViewPrice">{this.props.stock.price + '$'}</p>
            <div className="StockButtons">
                <button className="BuyButton" onClick={this.handleBuyButtonClicked}>buy</button>
                <button className="SellButton" onClick={this.handleSellButtonClicked}>sell</button>
            </div>
            </div>
        </div>
    };
}
