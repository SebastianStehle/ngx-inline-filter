import type { Preview } from '@storybook/angular';
import '../src/styles/layout.scss';
import '../src/styles/simple.scss';
import './style.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
