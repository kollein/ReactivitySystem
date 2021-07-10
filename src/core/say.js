import { cloneDeep } from 'lodash';
import {
  pushQueue,
  getQueue,
  flushQueue,
} from './observer/queueTracker';

const doc = window.document;

function h(comp) {
  console.log('comp', comp);
}

class Say {
  $vm = {};

  static _watchTimer;

  constructor(options) {
    if (Say._instance) {
      throw new Error("Singleton classes can't be instantiated more than once.");
    }
    Say._instance = this;
    // options
    console.log('options', options);
    // add options to the instance
    // 1: App.say component
    options.render(h);
  }

  static getVM() {
    return this.$vm;
  }

  createReactive(path, templateData) {
    const theData = {
      data: cloneDeep(templateData),
    };
    this.$vm[path] = {
      data: {},
    };
    Object.keys(templateData).forEach((key) => {
      const prop = key;
      Object.defineProperty(this.$vm[path].data, prop, {
        get: function reactiveGetter() {
          return theData.data[prop];
        },
        set: function reactiveSetter(newValue) {
          theData.data[prop] = newValue;
          const trackPath = `${path}.data.${prop}`;
          pushQueue(newValue, trackPath);
          Say.watch();
        },
      });
    });
  }

  static watch() {
    clearTimeout(this._watchTimer);
    // setTimeout: delay 4ms after resolution
    this._watchTimer = setTimeout(() => {
      const queue = getQueue();
      Promise.all(queue).then((x) => {
        console.log('Promise.then', x);
        flushQueue();
        // re-rendering
        console.log('re-rendering');
      });
    }, 0);
  }

  $mount(elSelector) {
    const rootEl = doc.querySelector(elSelector);
    console.log('rootEl', rootEl);
  }
}

export default Say;
