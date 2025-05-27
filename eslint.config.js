import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-native': reactNative,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactNative.configs.all.rules,
      'no-unused-vars': 'error',
      'no-var': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
    },
  },
  {
    files: ['**/*.js'],
    ignores: ['__tests__/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      semi: 'error',
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
]);