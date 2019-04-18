import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../store/index';
import { Preloader } from '../Preloader';
import * as events from '../app/events';
import { StockView } from './StockView';
import { doGetStocks }from '../../actions/stocks';

class StocksContainer extends Component {

    render() {
        return <div className="StocksContainer">
            { 
            this.props.stocks.map((stock, index) => {
                return <StockView stock={stock} key={stock.id || index}
                 history={this.props.stockHistoryMap.get(stock.id)}
                 error={this.props.errorMap.get(stock.id)}/>})
            }
        </div>
    };
}

function mapStateToProps(state) {
    return {
        stocks: state.gottenStocks.stocks || [],
        error: state.failGetStocks.error,
        accessToken: state.logon.accessToken || state.registrated.accessToken,
        stockHistoryMap: state.gottenStockHistory.stockHistoryMap,
        errorMap: state.gottenStockHistory.errorMap
      };
}

export default connect(mapStateToProps)(StocksContainer);
