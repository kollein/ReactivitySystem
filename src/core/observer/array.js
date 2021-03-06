/* eslint-disable no-unused-vars */
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index';

const arrayProto = Array.prototype;
// arrayMethods: is an object but it has prototype of an array
export const arrayMethods = Object.create(arrayProto);

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach((method) => {
  // cache original method
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    // console.log('methodsToPatch this', this);
    // console.log('methodsToPatch args', args);
    const result = original.apply(this, args);
    console.log('methodsToPatch:', method, args);
    // const ob = this.__ob__;
    // let inserted;
    // switch (method) {
    //   case 'push':
    //   case 'unshift':
    //     inserted = args;
    //     break;
    //   case 'splice':
    //     inserted = args.slice(2);
    //     break;
    //   default:
    //     break;
    // }
    // if (inserted) ob.observeArray(inserted);
    // notify change
    // ob.dep.notify();
    return result;
  });
});
