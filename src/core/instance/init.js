import { initRender } from './render';
import { mergeOptions } from '../util/mergeOptions';

let uid = 0;
const doc = window.document;

export function initMixin(Rs) {
  console.log('initMixin');
  Rs.prototype._init = function (options) {
    // vm: Single source of truth (view-model)
    const vm = this;
    // a uid
    uid += 1;
    vm._uid = uid;
    // merge options
    mergeOptions(vm, options);
    // expose real self
    vm._self = vm;

    vm.$mount = function (elementSelector) {
      const rootEl = doc.querySelector(elementSelector);
      vm._rootEl = rootEl;
    };
    // render
    initRender(vm);
  };
}

export function initInternalComponent() {
}
