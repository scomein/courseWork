import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../store/index';
import { Preloader } from '../Preloader';
import * as events from '../app/events';
import { doGetStocks, doGetStockHistory }from '../../actions/stocks';

import {Line as LineChart} from 'react-chartjs-2';

function chartData(data) {
  if(!data) return {}; 
  const res = {
          labels: data.labels,
          datasets: [
            {
              data: data.data,
              borderColor: 'green'  // Line color
            }
          ]
    }

    console.log("res");
    console.log(res);
    return res;
  }

  const options = {
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetFill: true,
    legend: {
      display: false
    }
  }

export class StockGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.stockHistory,
            id: props.stockId,
            error: props.error
        }
    }

    render() {
        console.log("rendering chart");
        console.log(this.props.stockHistory);
        return (<div>
            <LineChart data={chartData(this.props.stockHistory)}
              options={options} height="210"
              width="400"/>
          </div>);
    }
}
