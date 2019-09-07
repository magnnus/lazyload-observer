import 'intersection-observer';

interface Iconfig {
  root: Element | null;
  rootMargin: string | undefined;
  threshold: number | number[];
  delay: number;
  attr: string;
  srcsetAttr: string;
  removeAttr: boolean;
  placeholder: string;
  onLoad: () => void;
  onError: () => void;
  onAppear: () => void;
}

type TElements = string | NodeListOf<Element>;

class LazyLoad {
  constructor (public el: TElements, public config: Partial<Iconfig>) {
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

    // 预处理图片类型
    this._preProcessImage();

    this.init();
  }

  static readonly defaultConfig: Partial<Iconfig> = {
    delay: -1,
    attr: 'data-src',
    srcsetAttr: 'data-srcset',
    removeAttr: true,
    placeholder: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEHAAIALAAAAAABAAEAAAICVAEAOw==',
  }

  public targets: Element[]

  public observer: IntersectionObserver

  init (): void {
    const { delay } = this.config;
    if (delay >= 0) {
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
   * 直接加载
   */
  protected _loadDirectly: () => void = () => {
    this.targets.forEach(target => {
      if (this.config.onAppear) {
        this.config.onAppear.call(target);
      }
      if (this._isImageElement(target)) {
        this._processImageElement(target as HTMLImageElement);
      }
    });
  };

  protected _preProcessImage: () => void = () => {
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

  /**
   * 创建 IntersectionObserver 实例
   */
  createObserver (): IntersectionObserver {
    const { root = null, rootMargin = '0px', threshold = 0, onAppear } = this.config;
    return new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        onAppear && onAppear.call(entry.target);
        if (this._isImageElement(entry.target)) {
          this._processImageElement(entry.target as HTMLImageElement);
        }
      });
    }, {
      root,
      rootMargin,
      threshold,
    });
  }

  protected _isImageElement = (target: Element): boolean => {
    return target.tagName.toLowerCase() === 'img';
  }

  /**
   * 处理 img 元素
   *
   * @protected
   * @memberof LazyLoad
   */
  protected _processImageElement = (target: HTMLImageElement): void => {
    const { attr, srcsetAttr, removeAttr, onLoad, onError } = this.config;
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
    img.onerror = function (): void {
      onError && onError.call(target);
    };
    img.setAttribute('src', src);
    img.setAttribute('srcset', srcset || '');
  }
}

export default LazyLoad;
