import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      'prefer-promise-reject-errors': 'off',
      'vue/multi-word-component-names': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
  },
  {
    ignores: [
      'dist/*',
      'node_modules/*',
      '.quasar/*',
      'quasar.config.*.temporary.compiled*'
    ]
  }
];
