// 1. 创建store对象 存储默认状态
// 2. 将store对象放在一个全局的 组件可以够的到的地方
// 3. 让组件获取store对象中的状态 并将状态显示在组件中

import { computed, observable, action } from "mobx";

class AppleBasketStore {
    @observable apples = [
        {
            id: 0,
            weight: 233,
            isEaten: false
        },
        {
            id: 1,
            weight: 235,
            isEaten: true
        },
        {
            id: 2,
            weight: 256,
            isEaten: false
        }
    ];
    @observable newAppleId = 3;
    @observable isPicking = false;
    @observable buttonText = '摘苹果';

    /*摘苹果的异步操作*/
    @action pickApple = () => {

        /** 如果正在摘苹果，则结束这个thunk, 不执行摘苹果 */
        if (this.isPicking) {
            return;
        }

        this.isPicking = true;
        this.buttonText = '正在采摘...';

        // 模拟异步操作，数据自己mock
        setTimeout(() => {
            let weight = Math.floor(200 + Math.random() * 50);
            this.isPicking = false;
            this.buttonText = '摘苹果';
            this.apples.push({
                id: this.newAppleId++,
                weight: weight,
                isEaten: false
            });
        }, 500)
    }

    /* 这里需要写成箭头函数的形式，这样此函数从父组件传递到子组件的时候才能调用成功*/
    @action eatApple = (appleId) => {
        let targetIndex = this.apples.findIndex(item => item.id === appleId);
        this.apples[targetIndex].isEaten = true;
    }

    @computed get notEatenApples () {
        return this.apples.filter(item => item.isEaten === false);
    }

    @computed get status () {
        const notEatenApples = this.apples.filter(item => item.isEaten === false);
        const EatenApples = this.apples.filter(item => item.isEaten === true);
        const notEatenWeight = notEatenApples.reduce((acc, cur) => acc + cur.weight, 0);
        const EatenWeight = EatenApples.reduce((acc, cur) => acc + cur.weight, 0);
        return {
            notEatenQuantity: notEatenApples.length, // 当前苹果个数
            notEatenWeight, // 当前苹果重量
            EatenQuantity: EatenApples.length, // 已吃掉苹果个数
            EatenWeight // 已吃掉苹果重量
        }
    }
}

const appleBasket = new AppleBasketStore();

export default appleBasket;