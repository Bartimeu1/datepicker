import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  webpackFinal: async (config) => {
    const imageRule = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test;
      if (!test) {
        return false;
      }
      return test.test('.svg');
    }) as { [key: string]: unknown };

    imageRule.exclude = /\.svg$/;

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    if (config.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@root': path.resolve(__dirname, '../src'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@constants': path.resolve(__dirname, '../src/constants'),
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@services': path.resolve(__dirname, '../src/services'),
        '@assets': path.resolve(__dirname, '../src/assets'),
      };
    }

    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  docs: {
    autodocs: 'tag',
  },
};
export default config;
