import React, { Component } from 'react';

export class AccountStock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.stock.id,
            code: props.stock.code,
            name: props.stock.name,
            iconUrl: props.stock.iconUrl,
            price: props.stock.price,
            priceDelta: props.stock.priceDelta,
            count: props.stock.count
        }
    }

    render() {
        return (
          <div className="AccountStockItem">
            <img className="StockIcon" src={this.state.iconUrl} alt="icon"/>
            <div className="AccountStockDataContainer">
            <table className="AccountStockDataTable">
                <tbody>
                <tr>
                    <td className="StockName">{this.state.name}</td>
                    <td className="StockPrice">{this.state.price + '$'}</td>
                </tr>
                <tr>
                    <td className="StockCount">{this.state.count + 'шт'}</td>
                    <td className="StockPriceDelta" style={{color: this.state.priceDelta > 0 ? "#0ce836" : "#ff1010"}}>{this.state.priceDelta}</td>
                </tr>
                </tbody>
            </table>
            </div>
          </div>
        );
    };
}