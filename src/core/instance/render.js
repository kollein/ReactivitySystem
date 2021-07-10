import { defineReactive } from '../observer';
// import { getQueue } from '../observer/scheduler';

export function initRender(vm) {
  // vm: is the main instance that by reference from Single source of truth
  console.log('initRender', vm);
  defineReactive(vm, 'a');
  defineReactive(vm, 'b');
  defineReactive(vm, 'c');
  // console.log('after define a:', vm.a);
  // console.log('after define c:', vm.c);
  vm.c.push({ love: 100 });
  // vm.c.push({ city: 'hcm' });
  vm.b.job = 'ceo';
  // vm.a.family.dad = { name: 'hai nickname', age: 63 };
  // vm.a.family.dad.age = 64;
  vm.a.name = { position: 'dev', nickname: 'kollein' };
  // const queue = getQueue();
  // console.log('queue', queue);
}

// install runtime convenience helpers
export function renderMixin(Rs) {
  console.log('renderMixin', Rs.prototype);
}
