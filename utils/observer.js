import 'intersection-observer';
import { addClickLog } from './logger';

export default class Exposure {
    constructor() {
        this.dotDataArr = []; // 上报的数据列表
        this._observer = null;
        this.init();
    }

    init() {
        this._observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // 这段逻辑，是每一个商品进入视窗时都会触发的
                if (entry.isIntersecting) {
                    // const ctm = entry.target.attributes['data-dot'].value;
                    // // 把收集到的数据添加进待上报的数据数组中
                    this.addLog(entry.target);
                    // 收集到该商品的数据后，取消对该商品DOM的观察
                    // this._observer.unobserve(entry.target);
                }
                else {
                    // 离开
                    clearTimeout(entry.target.timer);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });
    }

    addLog(target) {
        let needUnobserve = true;
        let time = 500;
        const value = target['data-dot'];
        if (value.needUnobserve === false) {
            // 默认是true
            needUnobserve = false;
        }
        if (value.time !== undefined) {
            // 默认是500ms
            time = value.time;
        }
        clearTimeout(target.timer);
        target.timer = setTimeout(() => {
            if (needUnobserve) {
                this._observer.unobserve(target);
            }
            addClickLog(value);
        }, time || 0);
    }

    // 每个商品都会会通过全局唯一的Exposure的实例来执行该add方法,将自己添加进观察者中
    add(entry) {
        entry.el['data-dot'] = entry.val;
        this._observer && this._observer.observe(entry.el);
    }

    remove() {
        // 使IntersectionObserver对象停止监听工作
        this._observer && this._observer.disconnect();
    }
}
