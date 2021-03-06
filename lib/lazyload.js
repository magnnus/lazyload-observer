import 'intersection-observer';
class LazyLoad {
    constructor(el, config) {
        this.el = el;
        this.config = config;
        this.identifier = '__autots-lazyload-placeholder__';
        this._addPlaceholder = () => {
            const { placeholder, placeHeight, placeWidth, defaultSrcVal } = this.config;
            this.targets.forEach((target) => {
                if (this._isImageElement(target)) {
                    if (!target.getAttribute('src')) {
                        target.setAttribute('src', defaultSrcVal);
                    }
                }
                else {
                    const cont = target.innerHTML.trim();
                    if (!cont) {
                        const el = document.createElement('div');
                        el.style.width = placeWidth;
                        el.style.height = placeHeight;
                        el.innerHTML = placeholder;
                        el.className = this.identifier;
                        target.appendChild(el);
                    }
                }
            });
        };
        // only for non-image element
        this._removePlaceholder = (target) => {
            if (!this._isImageElement(target)) {
                const p = target.querySelector('.' + this.identifier);
                if (p) {
                    target.removeChild(p);
                }
            }
        };
        this._loadDirectly = () => {
            this.targets.forEach(target => {
                this._removePlaceholder(target);
                if (this.config.onAppear) {
                    this.config.onAppear.call(target);
                }
                if (this._isImageElement(target)) {
                    this._processImageElement(target);
                }
            });
        };
        this._isImageElement = (target) => {
            return target instanceof HTMLImageElement;
            // return target.tagName.toLowerCase() === 'img';
        };
        this._processImageElement = (target) => {
            const { attr, srcsetAttr, removeAttr, onLoad, onError, maxFailureNumber } = this.config;
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
            img.onerror = () => {
                if (maxFailureNumber > 0) {
                    const hasFailedNum = +target.getAttribute('lazyload-failed-number') || 0;
                    const currentFailedNum = hasFailedNum + 1;
                    target.setAttribute('lazyload-failed-number', `${currentFailedNum}`);
                    if (currentFailedNum >= maxFailureNumber) {
                        this.observer && this.observer.unobserve(target);
                    }
                }
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
        this.init();
    }
    init() {
        this._addPlaceholder();
        const { delay } = this.config;
        if (delay && delay >= 0) {
            setTimeout(() => {
                this._loadDirectly();
            }, delay);
            return;
        }
        this.observer = this._createObserver();
        this.targets.forEach(target => {
            this.observer.observe(target);
        });
    }
    _createObserver() {
        const { wait = 100, root = null, rootMargin = '0px', threshold = 0, onAppear, } = this.config;
        return new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const target = entry.target;
                if (!entry.isIntersecting) {
                    const timer = target.getAttribute('lazyload-timer');
                    timer && window.clearTimeout(+timer);
                }
                else {
                    const timer = window.setTimeout(() => {
                        this._removePlaceholder(target);
                        onAppear && onAppear.call(target);
                        if (this._isImageElement(target)) {
                            this._processImageElement(target);
                        }
                        else {
                            observer.unobserve(target);
                        }
                        window.clearTimeout(timer);
                        target.removeAttribute('lazyload-timer');
                    }, wait);
                    target.setAttribute('lazyload-timer', timer.toString());
                }
            });
        }, {
            root,
            rootMargin,
            threshold,
        });
    }
    unbind(target) {
        this.observer && this.observer.unobserve(target);
    }
    destory() {
        this.observer && this.observer.disconnect();
    }
}
LazyLoad.defaultConfig = {
    delay: -1,
    wait: 100,
    attr: 'data-src',
    srcsetAttr: 'data-srcset',
    removeAttr: true,
    defaultSrcVal: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEHAAIALAAAAAABAAEAAAICVAEAOw==',
    placeholder: '',
    placeWidth: '100%',
    placeHeight: '100%',
    maxFailureNumber: 1,
};
export default LazyLoad;
