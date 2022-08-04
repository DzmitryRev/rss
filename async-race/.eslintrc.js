module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  //   extends: ["airbnb-base", "airbnb-typescript/base", "plugin:@typescript-eslint/recommended"],
  //   parser: "@typescript-eslint/parser",
  //   parserOptions: {
  //     ecmaVersion: "latest",
  //     sourceType: "module",
  //     project: "./tsconfig.eslint.json",
  //   },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension

      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.eslint.json'], // Specify it only for TypeScript files
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
