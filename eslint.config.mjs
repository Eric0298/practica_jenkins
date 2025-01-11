import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsplugin from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      react: pluginReact,
      '@typescript-eslint': tseslint
    },
    parser: tsplugin,
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
