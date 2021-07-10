/* eslint-disable no-unused-vars */
import { def, hasOwn, isObject } from '../util';
import { arrayMethods } from './array';
import Watcher from './watcher';

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  value;
  vmCount; // number of vms that have this object as root $data
  parentPath;

  constructor(value) {
    this.value = value;
    this.parentPath = Watcher.path;
    def(value, '__ob__', this);
    this.vmCount = 0;
    if (Array.isArray(value)) {
      protoAugment(value, arrayMethods);
      // this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk(obj) {
    const keys = Object.keys(obj);
    // cache for the iterator
    const pathAtFixedLevel = Watcher.path;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const path = `${pathAtFixedLevel}.${key}`;
      // update path for determination
      Watcher.path = path;
      defineReactive(obj, key, true);
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
export function observe(value, isFromSetter) {
  if (!isObject(value)) return;

  let ob;
  if (hasOwn(value, '__ob__')) {
    console.log('++++++hasOwn __ob__');
    ob = value.__ob__;
  } else {
    if (isFromSetter) {
      console.log('targetStack', Watcher.targetStack);
    }
    ob = new Observer(value);
  }
  ob.vmCount++;
  return ob;
}

/**
 * Define a reactive property on an Object.
 */
export function defineReactive(obj, key, isChild) {
  // obj: is vm
  const watcher = new Watcher(isChild, key);
  // define reactive
  let val;
  val = obj[key];

  observe(val);
  Object.defineProperty(obj, key, {
    get: function reactiveGetter() {
      const value = val;
      return value;
    },
    set: function reactiveSetter(newVal) {
      const value = val;

      if (value === newVal) {
        return;
      }
      // set already
      val = newVal;
      watcher.notify(key);
      // if new value is an object, then observe
      observe(val, true);
    },
  });
}

export function defineComputed() {
}
