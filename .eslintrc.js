module.exports = {
  'env': {
    'es6': true,
    'node': true
  },
  'extends': 'airbnb',
  'parserOptions': {
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single',
      { "avoidEscape": true }
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-param-reassign': [
      'error',
      { 'props': false }
    ],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0
  }
};
