import { initMixin } from './init';
// import { stateMixin } from './state'
import { renderMixin } from './render';

function Rs(options) {
  if (process.env.NODE_ENV !== 'production'
    && !(this instanceof Rs)
  ) {
    console.warn('Rs is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

// 'init' will run first then the new Rs(options) will be triggered
// initMixin: create the only main instance for the app
initMixin(Rs);
// stateMixin(Rs)
renderMixin(Rs);

export default Rs;
