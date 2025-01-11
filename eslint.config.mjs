import globals from "globals";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parser: "@babel/eslint-parser",
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        requireConfigFile: false, // No necesita un archivo de Babel
        ecmaFeatures: {
          jsx: true, // Habilitar JSX
        },
      },
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-unused-expressions": "error",
    },
  },
];
