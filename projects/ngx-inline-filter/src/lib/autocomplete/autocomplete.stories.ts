import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';
import { Autocomplete } from './autocomplete';
import { DefaultOptions } from '../options';
import { DropdownOption } from '../_internal';

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
        container: {
            control: false,  
        },
        disabled: {
            control: 'boolean',
        },
        delete: {
            action: 'delete',
        },
        valueSelect: {
            action: 'fieldSelect',
        },
    },
    args: {
        container: null!,
        disabled: false,
        fields: buildItems(5),
        options: DefaultOptions,
        value: 'Value',
    },
    decorators: [
        componentWrapperDecorator(
            story => `
                <div [style.padding]="'20px'">
                    <div class="nf-complex-filter">
                        ${story}
                    </div>
                </div>`
        )
    ],
};

export default meta;
type Story = StoryObj<Autocomplete>;

export const Primary: Story = {
    args: {

    }
};