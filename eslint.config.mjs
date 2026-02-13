import process from "node:process";
import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import globals from "globals";

import Prettierrc from "./.prettierrc.js";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/build/**"],
  },

  js.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      prettier: prettierPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      /* ---------- General ---------- */
      "no-duplicate-imports": "warn",
      "no-undef": "off", // TS handles this better
      "react/react-in-jsx-scope": "off", // Next.js
      "react/prop-types": "off",

      /* ---------- Console ---------- */
      "no-restricted-syntax": [
        "warn",
        {
          selector:
            "CallExpression[callee.object.name='console'][callee.property.name='log']",
          message: "Avoid using console.log",
        },
      ],

      /* ---------- Unused ---------- */
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",

      /* ---------- JSX ---------- */
      "jsx-quotes": ["error", "prefer-double"],
      "react/jsx-uses-vars": "warn",
      "react/jsx-no-undef": ["error", { allowGlobals: true }],

      /* ---------- Imports ---------- */
      "import/order": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^node:"],
            ["^react", "^next", "^@?\\w"],
            ["^@/"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.css$", "^.+\\.(scss|less)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      /* ---------- Prettier ---------- */
      "prettier/prettier": ["error", Prettierrc],

      /* ---------- Code Quality ---------- */
      "no-useless-escape": "warn",
      "no-irregular-whitespace": "warn",
      "no-empty": "warn",
      "no-unsafe-optional-chaining": "warn",
      "no-case-declarations": "warn",
      "no-dupe-keys": "warn",
      "no-sparse-arrays": "warn",

      "max-lines": [
        "off",
        { max: 450, skipBlankLines: true, skipComments: true },
      ],
      complexity: ["off", { max: 10 }],
    },
  },

  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "max-lines-per-function": [
        "warn",
        { max: 50, skipBlankLines: true, skipComments: true },
      ],
    },
  },
];
