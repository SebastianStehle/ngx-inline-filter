import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import type { StorybookConfig } from '@analogjs/storybook-angular';
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
};
export default config;

function getAbsolutePath(value: string): any {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
