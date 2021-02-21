import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import AppleItem from './AppleItem';

@inject('store')
@observer
class AppleBasket extends Component {
    componentDidMount () {
        console.log('AppleBasket componentDidMount');
    }

    /* 获取未吃苹果的组件数组 */
    getApples() {
        const { notEatenApples, eatApple } = this.props.store;
        return (
            notEatenApples.length ?
            notEatenApples.map(apple => {
                return (
                    <AppleItem apple={apple} eatApple={eatApple} key={apple.id} />
                )
            })
            : <div className="empty-tip" key="empty">苹果篮子空空如也</div>
        )
    }

    render () {
        const { status, isPicking, pickApple, buttonText } = this.props.store;
        const { notEatenQuantity, notEatenWeight, EatenQuantity, EatenWeight } = status;
        return (
            <div className="appleBusket">
                <div className="title">苹果篮子</div>

                <div className="stats">
                    <div className="section">
                        <div className="head">当前</div>
                        <div className="content">
                            {notEatenQuantity}个苹果，{notEatenWeight}克
                        </div>
                    </div>
                    <div className="section">
                        <div className="head">已吃掉</div>
                        <div className="content">
                            {EatenQuantity}个苹果，{EatenWeight}克
                        </div>
                    </div>
                </div>

                <div className="appleList">
                    { this.getApples() }
                </div>

                <div className="btn-div">
                    <button className={isPicking ? 'disabled' : ''} onClick={pickApple}>
                        {buttonText}
                    </button>
                </div>
            </div>
        )
    }
}

export default AppleBasket;
