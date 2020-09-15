# lazyload observer

A LazyLoad Lib implemented through `IntersectionObserver` API

## Features

- typescript features & compiled to vanilla js 
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

### 1. ES Module

```js
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

### Browser Plugin

```html
<script src="dist/lazyload.min.js"></script>

<script>
  new AutoTs.LazyLoad(el, config);
</script>
```

[Online Demo](https://magnnus.github.io/lazyload-observer/public/index.html)

> There is a global variable `AutoTs`, and `LazyLoad` property is the constructor.

## API

```js
new LazyLoad(el, config);
```

```js
defaultConfig = {
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
}
```


| Name | Type | Default | Optional | Description |
|:-----------:|:------------------------------:|:-------------:|:---:|:-----------------------|
| el          | string \| NodeListOf\<Element\>| --            | No  | the element(s) need lazy |
| config      | typeof defaultConfig           | defaultConfig | Yes | Advanced configuration |


### config

| Name | Type | Default | Description |
|:-----------:|:-----------------:|:----------------:|:-----------------------|
| root        | Element \| null   | null             | same to `IntersectionObserver.root` |
| rootMargin  | string            | '0px'            | same to `IntersectionObserver.rootMargin` |
| threshold   | number \| number[]| 0                | same to `IntersectionObserver.threshold` |
| attr        | string            | data-src         | the attr name which saves ImageElement `src` value |
| srcset      | string            | data-srcset      | the attr name which saves ImageElement `srcset` value |
| delay       | number            | -1               | use `setTimeout(fn, delay)` to load all el |
| wait        | number            | 100              | use `setTimeout(fn, wait)` to decide if the el is visible |
| removeAttr  | boolean           | true             | remove attr name (configed with attr & srcsetAttr) |
| defaultSrcVal | String \| null  | [base64][base64] | the default value of img `src` attribute |
| placeholder | String            | ''               | the text/html content of placeholder for non-image el |
| placeWidth  | String            | '100%'           | the width of placeholder |
| placeHeight | string            | '100%'           | the height content of placeholder |
| onLoad      | Function          | --               | callback when `el` loaded |
| onError     | Function          | --               | callback when loaded error |
| onAppear    | Function          | --               | callback when `el` trigger in appearance |
| maxFailureNumbe | number        | 1                | after trigger onError `maxFailureNumber` times, will exec `unobserve` fn |

Note: The `el` type should be `String` or `NodeListOf<Element>`, that is to say we recommend you to use *CSS selector* to set , or use `querySelectorAll`.

[base64]: data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEHAAIALAAAAAABAAEAAAICVAEAOw== 
