import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { Autocomplete } from './autocomplete';
import { DefaultOptions } from '../options';
import { DropdownOption } from '../utils';

function buildItems(count: number) {
    const result: DropdownOption[] = [];
    for (var i = 1; i <= count; i++) {
        const label = `Field${i}`;

        result.push({ label, value: {} as any, searchText: label.toLocaleUpperCase(), description: 'Lorem ipsum dolor sit amet' });
    }

    return result;
}

const meta: Meta<Autocomplete> = {
    title: 'Autocomplete',
    component: Autocomplete,
    argTypes: {
    },
    args: {
        container: {} as any,
        delete: fn(),
        fields: buildItems(5),
        fieldSelect: fn(),
        options: DefaultOptions,
        value: 'Value',
    },
    render: args => ({
        props: args,
        template: `
            <div [style.padding]="'20px'">
                <div class="nf-complex-filter">
                    <div [style.padding]="'5px 10px'">
                        <filter-autocomplete
                            [container]="container"
                            [fields]="fields"
                            (fieldSelected)="fieldSelected?.($event)"
                            [options]="options"
                            [value]="value"
                            (valueChange)="valueChange?.($event)" />
                    </div>
                </div>
            </div>
        `,
    })
};

export default meta;
type Story = StoryObj<Autocomplete>;

export const Primary: Story = {
    args: {

    }
};