/* eslint-disable */
function init () {
  // bind on window just for convinient debug
  window.imgDemo = new AutoTs.LazyLoad('img', {
    attr: 'data-src2',
    srcsetAttr: 'data-srcset2',
    root: null,
    rootMargin: '0px',
    wait: 300,
    threshold: 0,
    onLoad: function () {
      var temp = this.src.split('/');
      console.log(temp[temp.length - 1], 'img loaded successly');
    },
    onError: function () {
      var temp = this.getAttribute('data-src2').split('/');
      console.log(temp[temp.length - 1], 'img loaded error');
      console.log(typeof this)
      // imgDemo.unbind(this)
    },
    onAppear: function () {
      var temp = this.getAttribute('data-src2').split('/');
      console.log(temp[temp.length - 1], 'img appeared');
    }
  });
  console.log('imgDemo', imgDemo);

  var moduleDemo = new AutoTs.LazyLoad('.lazymodule', {
    onAppear: function () {
      this.innerHTML += ('appeared!!!')
      console.log(this.innerHTML);
    }
  });
  console.log('moduleDemo', moduleDemo);


  let lazyDirectlyDemo = new AutoTs.LazyLoad('.lazydirectly', {
    onAppear: function () {
      this.innerHTML += (new Date().toLocaleString());
      console.log(this.innerHTML);
    },
    delay: 2000,
  });
  console.log('lazyDirectlyDemo', lazyDirectlyDemo);
};

function loadScript(src, cb) {
  var script = document.createElement('script');
  script.async = true;
  script.src = src;
  typeof cb === 'function' && (script.onload = cb);
  document.body.insertAdjacentElement('beforeend', script);
}

if (!AutoTs || !AutoTs.LazyLoad) {
  loadScript('https://magnnus.github.io/lazyload-observer/dist/lazyload.min.js', init)
} else {
  window.onload = init;
}