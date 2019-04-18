import React from 'react';
import './index.css';
import Authorization from './components/authorization/authorization';
import Terminal from './components/terminal/terminal'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import {store} from './store/index'
import {StockGraph} from './components/stocks/StockGraph';
import {SellView} from './components/terminal/SellView';
import {BuyView} from './components/terminal/BuyView';

render(
<Provider store={store}>
    <Authorization />
    <Terminal />
    <SellView/>
    <BuyView/>
</Provider>,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
