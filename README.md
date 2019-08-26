# lazyload-observer

A LazyLoad Lib implemented through IntersectionObserver API

## Featuires

- typescript featuires & compiled to vanilla js 
- original configuration of Intersection API  
- some custom lifecycle callback  
- support ie9+

## Installing

Using npm:

```
$ npm install @autots/lazyload -S
```

Using yarn:

```
$ yarn add @autots/lazyload
```

**Note:** cdn is not supported at now, maybe you can deliver the file `dist/lazyload.min.js` to your own cdn server.

## Example

```
import LazyLoad from '@autots/lazyload';

// 1. The simplest way
new LazyLoad('img[data-lazyload]');

// 2. use a config object
new LazyLoad('img[data-lazyload]',  {
  attr: 'data-src2',          // default is `data-src`
  srcsetAttr: 'data-srcset2', // default is `data-srcset`
  root: null,                 // default
  rootMargin: '0px',          // default
  threshold: 0,               // default
  onLoad: function() {        // the callback when a img loaded
    // console.log(this, 'ooooh');
  },
  onError: function() {       // the callback when loaded error
    // console.log(this, 'errrr');
  },
  onAppear: function() {      // the callback when element trigger in appearance
    // console.log(this, 'appear');
  }
})
```

## API

```
new LazyLoad(el, config);
```
| Name | Type | Default | Optional | Description
|:-------------:|:-------------------:|:-------------:|:-------:|:-----------------------|
| el                 | string \| NodeListOf\<Element\> | --          | NO  | the element(s) need lazy |
| config.root        | Element \| null               | null        | YES | same to IntersectionObserver.root |
| config.rootMargin  | string \| undefined           | '0px'       | YES | same to IntersectionObserver.rootMargin |
| config.threshold   | number \| number[]            | 0           | YES | same to IntersectionObserver.threshold |
| config.attr        | string                        | data-src    | YES | the attr which saves el src value |
| config.srcset      | string                        | data-srcset | YES | the attr which saves el srcset value |
| config.delay       | number                        | -1          | YES | use etTimeout to load all el |
| config.removeAttr  | boolean                       | true | YES | remove attribute (config with attr & srcsetAttr) |
| config.placeholder | String \| null                | data:image | YES | the default value of img `src` attribute |
| config.onLoad      | Function                      | --   | YES | callback when el loaded |
| config.onError     | Function                      | --   | YES | callback when loaded error |
| config.onAppear    | Function                      | --   | YES | callback when el trigger in appearance |
