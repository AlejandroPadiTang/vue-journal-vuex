const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src/'),
      vue$: 'vue/dist/vue.esm-bundler.js'
    };

    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        { test: /\.(scss|sass)$/i, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }] }
      ]
    }

    return config;
  },
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}