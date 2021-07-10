import App from './App.html';

export default {
  name: 'App',
  template: App,
  data() {
    return {
      a: {
        age: 28,
        family: {
          dad: 'hai',
          mom: 'ngan',
        },
        name: 'vinh',
      },
      b: {
        job: 'dev',
        salary: 100,
      },
      c: [
        {
          item: 'chilli',
          color: 'red',
        },
      ],
    };
  },
};
