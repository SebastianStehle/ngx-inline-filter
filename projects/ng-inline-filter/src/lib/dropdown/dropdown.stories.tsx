import type { Meta, StoryObj } from '@storybook/angular';
import { Dropdown } from './dropdown';
import { DropdownOption } from '../utils';
import { BootstrapClasses, DefaultOptions } from '../options';

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

const meta: Meta<Dropdown> = {
    title: 'Dropdown',
    component: Dropdown,
    argTypes: {
    },
    args: {
        items: buildItems(5),
        options: DefaultOptions,
        value: 'Value',
    },
};

export default meta;
type Story = StoryObj<Dropdown>;

export const Primary: Story = {
    args: {
        showSearch: false,
        value: 'field1',
    }
};

export const ShowSearch: Story = {
    args: {
        showSearch: true,
        value: 'field1',
    }
};

export const Button: Story = {
    args: {
        asButton: true,
        value: 'field1',
    }
};

export const LongShowSearch: Story = {
    args: {
        items: buildItems(20),
        showSearch: true,
        typeaheadLabel: 'NONE',
        value: 'field1',
    }
};

export const LongshowSearchDescription: Story = {
    args: {
        items: buildItems(20),
        showSearch: true,
        showDescription: true,
        typeaheadLabel: 'NONE',
        value: 'field1',
    }
};

export const Bootstrap: Story = {
    args: {
        items: buildItems(20),
        showSearch: true,
        showDescription: true,
        typeaheadLabel: 'NONE',
        value: 'field1',
        options: {
            ...DefaultOptions,
            cssClasses: BootstrapClasses,
        },
    },
    render: args => ({
        props: args,
        template: `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">

            <filter-dropdown
                [items]="items"
                [options]="options"
                [showSearch]="showSearch"
                [showDescription]="showDescription"
                [typeaheadLabel]="typeaheadLabel"
                [value]="value"
                (valueChange)="valueChange?.($event)" />
        `,
    })
};