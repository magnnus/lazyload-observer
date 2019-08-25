/*!
 * @autots/lazyload v0.0.1
 * Last Modified @ 2019-8-25 22:27:15
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LazyLoad"] = factory();
	else
		root["AutoTs"] = root["AutoTs"] || {}, root["AutoTs"]["LazyLoad"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);
var LazyLoad = /** @class */ (function () {
    function LazyLoad(el, config) {
        var _this = this;
        this.el = el;
        this.config = config;
        /**
         * 直接加载
         */
        this._loadDirectly = function () {
            _this.targets.forEach(function (target) {
                if (_this.config.onAppear) {
                    _this.config.onAppear.call(target);
                }
                if (_this._isImageElement(target)) {
                    _this._processImageElement(target);
                }
            });
        };
        this._preProcessImage = function () {
            var placeholder = _this.config.placeholder;
            _this.targets.forEach(function (target) {
                if (!_this._isImageElement(target)) {
                    return;
                }
                if (target.getAttribute('src') === undefined || !target.getAttribute('src')) {
                    target.setAttribute('src', placeholder);
                }
            });
        };
        this._isImageElement = function (target) {
            return target.tagName.toLowerCase() === 'img';
        };
        /**
         * 处理 img 元素
         *
         * @protected
         * @memberof LazyLoad
         */
        this._processImageElement = function (target) {
            var _a = _this.config, attr = _a.attr, srcsetAttr = _a.srcsetAttr, removeAttr = _a.removeAttr, onLoad = _a.onLoad, onError = _a.onError;
            var src = target.getAttribute(attr);
            var srcset = target.getAttribute(srcsetAttr);
            if (!src && !srcset) {
                return;
            }
            var img = document.createElement('img');
            img.onload = function () {
                target.setAttribute('src', src);
                if (srcset) {
                    target.setAttribute('srcset', srcset);
                }
                if (removeAttr) {
                    target.removeAttribute(attr);
                    target.removeAttribute(srcsetAttr);
                }
                _this.observer && _this.observer.unobserve(target);
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
        this.config = __assign({}, LazyLoad.defaultConfig, config);
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
    LazyLoad.prototype.init = function () {
        var _this = this;
        var delay = this.config.delay;
        if (delay >= 0) {
            setTimeout(function () {
                _this._loadDirectly();
            }, delay);
            return;
        }
        this.observer = this.createObserver();
        this.targets.forEach(function (target) {
            _this.observer.observe(target);
        });
    };
    /**
     * 创建 IntersectionObserver 实例
     */
    LazyLoad.prototype.createObserver = function () {
        var _this = this;
        var _a = this.config, _b = _a.root, root = _b === void 0 ? null : _b, _c = _a.rootMargin, rootMargin = _c === void 0 ? '0' : _c, _d = _a.threshold, threshold = _d === void 0 ? 0 : _d, onAppear = _a.onAppear;
        return new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                onAppear && onAppear.call(entry.target);
                if (_this._isImageElement(entry.target)) {
                    _this._processImageElement(entry.target);
                }
            });
        }, {
            root: root,
            rootMargin: rootMargin,
            threshold: threshold,
        });
    };
    LazyLoad.defaultConfig = {
        delay: -1,
        attr: 'data-src',
        srcsetAttr: 'data-srcset',
        removeAttr: true,
        placeholder: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEHAAIALAAAAAABAAEAAAICVAEAOw==',
    };
    return LazyLoad;
}());
exports.default = LazyLoad;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("intersection-observer");

/***/ })
/******/ ])["default"];
});