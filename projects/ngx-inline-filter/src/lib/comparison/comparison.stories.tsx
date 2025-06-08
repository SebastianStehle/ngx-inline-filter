import { Meta, StoryObj } from '@storybook/angular';
import { Comparison } from './comparison';
import { StringValue } from '../values/string-value/string-value';
import { NumberValue } from '../values/number-value/number-value';
import { BooleanValue } from '../values/boolean-value/boolean-value';
import { DateValue } from '../values/date-value/date-value';
import { DateTimeValue } from '../values/datetime-value/datetime-value';
import { SelectValue } from '../values/select-value/select-value';
import { DefaultOptions } from '../options';
import { getFieldOptions, getOperatorOptions } from '../_internal';
import { FilterModel } from '../model';

const Operators = [
    'eq',
    'ne',
    'lt'
];

const model: FilterModel = {
    operators: [{
        value: 'eq',
        label: 'equal'
    }, {
        value: 'eq',
        label: 'not equal'
    }],
    fields: [{
        path: 'string',
        label: 'String1',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: StringValue
    }, {
        path: 'number',
        label: 'Number2',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: NumberValue
    }, {
        path: 'date',
        label: 'Date',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: DateValue
    }, {
        path: 'dateTime',
        label: 'DateTime',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: DateTimeValue
    }, {
        path: 'boolean',
        label: 'Boolean1',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: BooleanValue
    }, {
        path: 'enum',
        label: 'Enum',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: SelectValue,
        args: [{
            value: 'option1',
            label: 'Option1'
        }, {
            value: 'option2',
            label: 'Option2'
        }, {
            value: 'option3',
            label: 'Option3'
        }, {
            value: 'optionG_1',
            label: 'OptionG_1',
            group: 'G'
        },  {
            value: 'optionG_2',
            label: 'OptionG_2',
            group: 'G'
        }]
    }]
};

const meta: Meta<Comparison> = {
    title: 'Comparison',
    component: Comparison,
    argTypes: {
    },
    args: {
        context: {
            fields: getFieldOptions(model),
            model,
            operators: getOperatorOptions(model),
        },
        disabled: false,
        options: DefaultOptions,
    },
};

export default meta;
type Story = StoryObj<Comparison>;

export const InlineString: Story = {
    args: {
        node: { path: 'string', op: 'eq', value: 'Hello' },
        grid: false,
    }
};

export const InlineNumber: Story = {
    args: {
        node: { path: 'string', op: 'eq', value: 42 },
        grid: false,
    }
};

export const InlineBoolean: Story = {
    args: {
        node: { path: 'boolean', op: 'eq', value: true },
        grid: false,
    }
};

export const InlineDate: Story = {
    args: {
        node: { path: 'date', op: 'eq', value: '2025-01-02' },
        grid: false,
    }
};

export const InlineDateTime: Story = {
    args: {
        node: { path: 'dateTime', op: 'eq', value: '2025-01-02T12:11:10' },
        grid: false,
    }
};

export const InlineEnum: Story = {
    args: {
        node: { path: 'enum', op: 'eq', value: 'option1' },
        grid: false,
    }
};

export const InlineNegated: Story = {
    args: {
        node: { not: { path: 'enum', op: 'eq', value: 'option1' }},
        grid: false,
    }
};

export const GridString: Story = {
    args: {
        node: { path: 'string', op: 'eq', value: 'Hello' },
        grid: true,
    }
};

export const GridNumber: Story = {
    args: {
        node: { path: 'string', op: 'eq', value: 42 },
        grid: true,
    }
};

export const GridBoolean: Story = {
    args: {
        node: { path: 'boolean', op: 'eq', value: true },
        grid: true,
    }
};

export const GridDate: Story = {
    args: {
        node: { path: 'date', op: 'eq', value: '2025-01-02' },
        grid: true,
    }
};

export const GridDateTime: Story = {
    args: {
        node: { path: 'dateTime', op: 'eq', value: '2025-01-02T12:11:10' },
        grid: true,
    }
};

export const GridEnum: Story = {
    args: {
        node: { path: 'enum', op: 'eq', value: 'option1' },
        grid: true,
    }
};

export const GridNegated: Story = {
    args: {
        node: { not: { path: 'enum', op: 'eq', value: 'option1' }},
        grid: true,
    }
};

