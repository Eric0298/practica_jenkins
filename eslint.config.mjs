import globals from "globals";
import pluginReact from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser"; // Importa el parser directamente

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: babelParser, // Usa el parser importado
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // No requiere React en JSX
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^(React|RenderText|RenderLogo|RenderLink)$", // Ignora React y los componentes en pruebas
        },
      ],
      "no-unused-expressions": "error",
    },
  },
  {
    files: ["**/*.test.js"], // Configuración específica para archivos de prueba
    rules: {
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^(React|RenderText|RenderLogo|RenderLink)$", // Ignorar estos nombres en pruebas
        },
      ],
    },
  },
];
