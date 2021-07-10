import Rs from './core';
import App from './app/App';

const options = {
  render: (h) => h(App),
};

const elementSelector = '#my-application';
new Rs(options).$mount(elementSelector);
