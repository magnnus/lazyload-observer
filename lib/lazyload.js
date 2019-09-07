import 'intersection-observer';
class LazyLoad {
    constructor(el, config) {
        this.el = el;
        this.config = config;
        /**
         * 直接加载
         */
        this._loadDirectly = () => {
            this.targets.forEach(target => {
                if (this.config.onAppear) {
                    this.config.onAppear.call(target);
                }
                if (this._isImageElement(target)) {
                    this._processImageElement(target);
                }
            });
        };
        this._preProcessImage = () => {
            const { placeholder } = this.config;
            this.targets.forEach((target) => {
                if (!this._isImageElement(target)) {
                    return;
                }
                if (target.getAttribute('src') === undefined || !target.getAttribute('src')) {
                    target.setAttribute('src', placeholder);
                }
            });
        };
        this._isImageElement = (target) => {
            return target.tagName.toLowerCase() === 'img';
        };
        /**
         * 处理 img 元素
         *
         * @protected
         * @memberof LazyLoad
         */
        this._processImageElement = (target) => {
            const { attr, srcsetAttr, removeAttr, onLoad, onError } = this.config;
            const src = target.getAttribute(attr);
            const srcset = target.getAttribute(srcsetAttr);
            if (!src && !srcset) {
                return;
            }
            let img = document.createElement('img');
            img.onload = () => {
                target.setAttribute('src', src);
                if (srcset) {
                    target.setAttribute('srcset', srcset);
                }
                if (removeAttr) {
                    target.removeAttribute(attr);
                    target.removeAttribute(srcsetAttr);
                }
                this.observer && this.observer.unobserve(target);
                img = null;
                onLoad && onLoad.call(target);
            };
            img.onerror = function () {
                onError && onError.call(target);
            };
            img.setAttribute('src', src);
            img.setAttribute('srcset', srcset || '');
        };
        // 生成最终配置
        this.config = Object.assign({}, LazyLoad.defaultConfig, config);
        // 获取监听对象
        if (typeof el === 'string') {
            this.targets = Array.prototype.slice.apply(document.querySelectorAll(el));
        }
        else {
            this.targets = Array.prototype.slice.apply(el);
        }
        // 预处理图片类型
        this._preProcessImage();
        this.init();
    }
    init() {
        const { delay } = this.config;
        if (delay && delay >= 0) {
            setTimeout(() => {
                this._loadDirectly();
            }, delay);
            return;
        }
        this.observer = this.createObserver();
        this.targets.forEach(target => {
            this.observer.observe(target);
        });
    }
    /**
     * 创建 IntersectionObserver 实例
     */
    createObserver() {
        const { root = null, rootMargin = '0px', threshold = 0, onAppear } = this.config;
        return new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                onAppear && onAppear.call(entry.target);
                if (this._isImageElement(entry.target)) {
                    this._processImageElement(entry.target);
                }
                else {
                    this.observer && this.observer.unobserve(entry.target);
                }
            });
        }, {
            root,
            rootMargin,
            threshold,
        });
    }
}
LazyLoad.defaultConfig = {
    delay: -1,
    attr: 'data-src',
    srcsetAttr: 'data-srcset',
    removeAttr: true,
    placeholder: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEHAAIALAAAAAABAAEAAAICVAEAOw==',
};
export default LazyLoad;
//# sourceMappingURL=lazyload.js.map