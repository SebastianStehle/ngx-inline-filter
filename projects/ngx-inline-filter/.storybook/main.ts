import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import type { StorybookConfig } from '@storybook/angular';
import { resolve } from 'path';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-docs'),
    ],
    framework: {
        name: '@analogjs/storybook-angular',
        options: {},
    },
    async viteFinal(config) {
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = config.optimizeDeps.include || [];
    config.optimizeDeps.include.push('ngx-scrollbar');

    // Set the correct resolve conditions
    config.resolve = config.resolve || {};
    config.resolve.conditions = ['import', 'module', 'browser', 'default'];

    return config;
    },
};
export default config;

function getAbsolutePath(value: string): any {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
