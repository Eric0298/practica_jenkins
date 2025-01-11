import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from '@eslint/compat';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      react: pluginReact,
      ts: tseslint
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
]);
