import 'intersection-observer';

interface Iconfig {
  root: Element | null;
  rootMargin: string | undefined;
  threshold: number | number[];
  delay: number;
  maxFailureNumber: number;
  attr: string;
  srcsetAttr: string;
  removeAttr: boolean;
  defaultSrcVal: string;
  placeholder: string;
  placeWidth: string;
  placeHeight: string;
  onLoad: () => void;
  onError: () => void;
  onAppear: () => void;
}

type TElements = string | NodeListOf<Element>;

class LazyLoad {
  constructor (public el: TElements, public config?: Partial<Iconfig>) {
    // 生成最终配置
    this.config = {
      ...LazyLoad.defaultConfig,
      ...config,
    };

    // 获取监听对象
    if (typeof el === 'string') {
      this.targets = Array.prototype.slice.apply(document.querySelectorAll(el));
    } else {
      this.targets = Array.prototype.slice.apply(el);
    }

    this.init();
  }

  static readonly defaultConfig: Partial<Iconfig> = {
    delay: -1,
    attr: 'data-src',
    srcsetAttr: 'data-srcset',
    removeAttr: true,
    defaultSrcVal: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEHAAIALAAAAAABAAEAAAICVAEAOw==',
    placeholder: '',
    placeWidth: '100%',
    placeHeight: '100%',
    maxFailureNumber: 2,
  }

  public targets: Element[];

  public observer: IntersectionObserver;

  public identifier = '__autots-lazyload-placeholder__';

  init (): void {
    this._processPlaceholder();
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

  createObserver (): IntersectionObserver {
    const { root = null, rootMargin = '0px', threshold = 0, onAppear } = this.config;
    return new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        this._removePlaceholder(entry.target);
        onAppear && onAppear.call(entry.target);
        if (this._isImageElement(entry.target)) {
          this._processImageElement(entry.target as HTMLImageElement);
        } else {
          this.observer && this.observer.unobserve(entry.target);
        }
      });
    }, {
      root,
      rootMargin,
      threshold,
    });
  }

  public unbind (target: Element): void {
    this.observer && this.observer.unobserve(target);
  }

  protected _processPlaceholder: () => void = () => {
    const { placeholder, placeHeight, placeWidth, defaultSrcVal } = this.config;

    this.targets.forEach((target) => {
      if (this._isImageElement(target)) {
        if (target.getAttribute('src') === undefined || !target.getAttribute('src')) {
          target.setAttribute('src', defaultSrcVal || placeholder);
        }
      } else {
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

  protected _removePlaceholder = (target: Element): void => {
    if (!this._isImageElement(target)) {
      const p = target.querySelector('.' + this.identifier);
      if (p) {
        target.removeChild(p);
      }
    }
  }

  protected _loadDirectly: () => void = () => {
    this.targets.forEach(target => {
      this._removePlaceholder(target);
      if (this.config.onAppear) {
        this.config.onAppear.call(target);
      }
      if (this._isImageElement(target)) {
        this._processImageElement(target as HTMLImageElement);
      }
    });
  };

  protected _isImageElement = (target: Element): boolean => {
    return target.tagName.toLowerCase() === 'img';
  }

  protected _processImageElement = (target: HTMLImageElement): void => {
    const { attr, srcsetAttr, removeAttr, onLoad, onError, maxFailureNumber } = this.config;
    const src = target.getAttribute(attr);
    const srcset = target.getAttribute(srcsetAttr);

    if (!src && !srcset) {
      return;
    }

    let img = document.createElement('img');
    img.onload = (): void => {
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
    img.onerror = (): void => {
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
  }
}

export default LazyLoad;
