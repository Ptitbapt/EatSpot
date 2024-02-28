module.exports = {
  root: true,
  extends: ['@react-native', 'eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react-native/no-inline-styles': 0,
    'prettier/prettier': [
      'error',
      {
        'no-inline-styles': false,
      },
    ],
  },
};
