import 'intersection-observer';
interface IConfig {
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
    onAppear: (target: Element, length: number, config: Partial<IConfig>) => void;
}
declare type TElements = string | NodeListOf<Element>;
declare class LazyLoad {
    el: TElements;
    config: Partial<IConfig>;
    constructor(el: TElements, config: Partial<IConfig>);
    static readonly defaultConfig: Partial<IConfig>;
    targets: Element[];
    observer: IntersectionObserver;
    init(): void;
    /**
     * 直接加载
     */
    protected _loadDirectly: () => void;
    protected _preProcessImage: () => void;
    /**
     * 创建 IntersectionObserver 实例
     */
    createObserver(): IntersectionObserver;
    protected _isImageElement: (target: Element) => boolean;
    /**
     * 处理 img 元素
     *
     * @protected
     * @memberof LazyLoad
     */
    protected _processImageElement: (target: Element) => void;
}
export { LazyLoad };
