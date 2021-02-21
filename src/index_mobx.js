/* mobx实现 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { autorun } from 'mobx';
import appleBasketStore from './mobx/appleBasketStore';
import AppleBasket from './mobx/AppleBasket';
import './styles/appleBasket.css';

/** acturun测试*/
autorun(()=> {
    if (appleBasketStore.isPicking) {
        console.log('又在采摘新苹果了');
    }
});

ReactDOM.render(
    <Provider store={appleBasketStore}><AppleBasket /></Provider>,
    document.getElementById('root')
);
