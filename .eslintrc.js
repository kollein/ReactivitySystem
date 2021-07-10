module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    'no-eval': 0,
    'no-underscore-dangle': 0,
    'func-names': 0,
    'no-param-reassign': 0,
    'lines-between-class-members': 0,
    'class-methods-use-this': 0,
    'no-plusplus': 0,
    'consistent-return': 0,
    'no-use-before-define': 0,
    'no-multi-assign': 0,
    'import/prefer-default-export': 0,
    'prefer-destructuring': ['error', { 'object': true, 'array': false }],
  },
};
