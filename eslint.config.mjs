// @ts-check
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended, // заменяет FlatCompat + eslint-config-prettier
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      'no-debugger': 'off',
      'no-console': 0,
      'class-methods-use-this': 'off',
    },
  },
]);