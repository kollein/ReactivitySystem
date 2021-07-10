// the current changes to be flushed out
let queue = [];
let _watchTimer;

export function pushQueue(data) {
  const queueData = { ...data };
  const item = Promise.resolve(queueData);
  queue.push(item);
}

export function flushSchedulerQueue() {
  queue = [];
}

export function getQueue() {
  return queue;
}

export function queueWatcher() {
  clearTimeout(_watchTimer);
  // setTimeout: delay 4ms after resolution
  _watchTimer = setTimeout(() => {
    const curQueue = getQueue();
    Promise.all(curQueue).then((x) => {
      console.log('Promise.then', x);
      flushSchedulerQueue();
      // re-rendering
      console.log('re-rendering');
    });
  }, 0);
}
