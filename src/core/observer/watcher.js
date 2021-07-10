import { pushQueue, queueWatcher } from './scheduler';

let uid = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
let dep = 0;
export default class Watcher {
  id; // reactive data id
  rootDep; // root id of the object
  subs = []; // contains the dependencies itself
  static path; // the nested object path
  static targetStack = []; // contains all the targets

  constructor(isChild, key) {
    if (isChild) {
      console.log('---isChild: dep', dep, uid, key, Watcher.path);
      this.rootDep = dep;
    } else {
      console.log('isChild is false:', uid, key);
      // reset the root key object
      Watcher.path = key;
      dep = uid;
    }
    // uid for batching
    this.id = uid++;
    // push dependencies as path
    this.subs.push(Watcher.path);
    // push new target
    Watcher.targetStack.push(this);
  }

  /**
   * Reset method.
   * Will set dependencies back when the specified object has been changed.
   */
  reset() {
    const { id } = this;
    const target = Watcher.targetStack.find((x) => x.id === id);
    Watcher.path = target.subs[0];
    dep = target.rootDep;
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  notify(key) {
    this.reset();
    const queue = {
      key,
      target: this,
    };
    pushQueue(queue);
    queueWatcher();
  }
}
