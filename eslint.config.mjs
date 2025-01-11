import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.browser,
      parser: '@typescript-eslint/parser', // mover el parser aquí
    }
  },
  {
    plugins: {
      react: pluginReact,
      '@typescript-eslint': tseslint
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/react-in-jsx-scope': 'off'
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended'
    ]
  }
];
