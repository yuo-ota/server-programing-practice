import type { StorybookConfig } from '@storybook/react-vite';
import { loadConfigFromFile, mergeConfig } from 'vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';


/** @type {import('@storybook/react-vite').StorybookConfig} */

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@newhighsco/storybook-addon-svgr"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
};
export default config;