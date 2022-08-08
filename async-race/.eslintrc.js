module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./async-race/tsconfig.eslint.json'],
      },
    },
    { files: ['*.js'], extends: ['airbnb-base'] },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
  rules: {
    'no-unused-vars': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        js: 'never',
      },
    ],
  },
};
