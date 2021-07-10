# ReactivitySystem (RS)
A javascript reactivity system for Single Page Application.

## Introduction:
As we know "One of Vue’s most distinct features is the unobtrusive reactivity system.
Models are just plain JavaScript objects.
When you modify them, the view updates.
It makes state management simple and intuitive"
Reactivity System will also do the same.

## How it works?
"Whenever a data change is observed, it will open a queue and buffer all the data changes into the queue only once."

## Async Update Queue
"RS flushes the queue and performs the actual (already de-duped) work.
Internally RS tries native `Promise.then` and `setImmediate` for the asynchronous queuing and falls back to `setTimeout(fn, 0)`"

#### For Objects:
```
var vm = new Rs({
  data: {
    a: 1
  }
})
// `vm.a` is now reactive
```

#### For Arrays:
```
var vm = new Rs({
  data: {
    items: ['a', 'b', 'c']
  }
})
```
- Patched-methods for Observer
```
'push',
'pop',
'shift',
'unshift',
'splice',
'sort',
'reverse'
```

