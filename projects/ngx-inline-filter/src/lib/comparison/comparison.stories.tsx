import { Meta, StoryObj } from '@storybook/angular';
import { Comparison } from './comparison';
import { StringValue } from '../values/string-value/string-value';
import { NumberValue } from '../values/number-value/number-value';
import { BooleanValue } from '../values/boolean-value/boolean-value';
import { DateValue } from '../values/date-value/date-value';
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
        path: 'string1',
        label: 'String1',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: StringValue
    }, {
        path: 'string2',
        label: 'String2',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: StringValue
    }, {
        path: 'number1',
        label: 'Number1',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: NumberValue
    }, {
        path: 'number2',
        label: 'Number2',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: NumberValue
    }, {
        path: 'date1',
        label: 'Date1',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: DateValue
    }, {
        path: 'date2',
        label: 'Date1',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: DateValue
    }, {
        path: 'boolean1',
        label: 'Boolean1',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: BooleanValue
    }, {
        path: 'boolean2',
        label: 'Boolean2',
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
            value: 'Option1',
            label: 'Option1'
        }, {
            value: 'Option2',
            label: 'Option2'
        }, {
            value: 'Option3',
            label: 'Option3'
        }, {
            value: 'OptionG_1',
            label: 'OptionG_1',
            group: 'G'
        },  {
            value: 'OptionG_2',
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
        node: { path: 'string1', op: 'eq', value: 'Hello' },
        grid: false,
    }
};

export const InlineNumber: Story = {
    args: {
        node: { path: 'string1', op: 'eq', value: 42 },
        grid: false,
    }
};

export const InlineBoolean: Story = {
    args: {
        node: { path: 'boolean1', op: 'eq', value: true },
        grid: false,
    }
};

export const InlineDate: Story = {
    args: {
        node: { path: 'date1', op: 'eq', value: '2025-01-02' },
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
        node: { path: 'string1', op: 'eq', value: 'Hello' },
        grid: true,
    }
};

export const GridNumber: Story = {
    args: {
        node: { path: 'string1', op: 'eq', value: 42 },
        grid: true,
    }
};

export const GridBoolean: Story = {
    args: {
        node: { path: 'boolean1', op: 'eq', value: true },
        grid: true,
    }
};

export const GridDate: Story = {
    args: {
        node: { path: 'date1', op: 'eq', value: '2025-01-02' },
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

