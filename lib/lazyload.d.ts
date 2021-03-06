import 'intersection-observer';
export interface Iconfig {
    root: Element | null;
    rootMargin: string;
    threshold: number | number[];
    wait: number;
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
export declare type TElements = string | NodeListOf<Element> | Element[];
declare class LazyLoad {
    el: TElements;
    config?: Partial<Iconfig>;
    constructor(el: TElements, config?: Partial<Iconfig>);
    static readonly defaultConfig: Partial<Iconfig>;
    targets: Element[];
    observer: IntersectionObserver;
    identifier: string;
    init(): void;
    protected _createObserver(): IntersectionObserver;
    unbind(target: Element): void;
    destory(): void;
    protected _addPlaceholder: () => void;
    protected _removePlaceholder: (target: Element) => void;
    protected _loadDirectly: () => void;
    protected _isImageElement: (target: Element) => boolean;
    protected _processImageElement: (target: HTMLImageElement) => void;
}
export default LazyLoad;
