import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import type { StorybookConfig } from '@analogjs/storybook-angular';
import { resolve } from 'path';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    framework: {
        name: '@analogjs/storybook-angular',
        options: {},
    },
    async viteFinal(config) {
        config.css = config.css ?? {};
        config.css.preprocessorOptions = {
            ...config.css.preprocessorOptions,
            scss: {
                quietDeps: true,
                silenceDeprecations: [
                    'import',
                    'global-builtin',
                    'color-functions',
                ],
            },
        };

        return config;
    },
};

export default config;

function getAbsolutePath(value: string): any {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
