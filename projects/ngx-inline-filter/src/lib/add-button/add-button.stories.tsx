import type { Meta, StoryObj } from '@storybook/angular';
import { AddButton } from './add-button';
import { DropdownOption } from '../_internal';
import { DefaultOptions } from '../options';

function buildItems(count: number) {
    const result: DropdownOption[] = [];
    for (var i = 1; i <= count; i++) {
        if (i % 2 === 1) {
            const label = `Field${i}`;
    
            result.push({ label, value: label.toLocaleLowerCase(), searchText: label.toLocaleUpperCase(), description: 'Lorem ipsum dolor sit amet' });
        } else {
            const label = `LongField${i}`;

            result.push({ label, value: label.toLocaleLowerCase(), searchText: label.toLocaleUpperCase(), description: 'Lorem ipsum dolor sit amet' });
        }
    }

    return result;
}

const meta: Meta<AddButton> = {
    title: 'AddButton',
    component: AddButton,
    argTypes: {
        disabled: {
            control: 'boolean',
        },
        selected: {
            action: 'selected'
        }
    },
    args: {
        items: buildItems(5),
        options: DefaultOptions,
    },
};

export default meta;
type Story = StoryObj<AddButton>;

export const Primary: Story = {
    args: {
    }
};