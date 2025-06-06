import { type Meta, type StoryObj } from '@storybook/angular';
import { Input } from './input';
import { StringValue } from '../values/string-value/string-value';
import { NumberValue } from '../values/number-value/number-value';
import { BooleanValue } from '../values/boolean-value/boolean-value';
import { DateValue } from '../values/date-value/date-value';
import { SelectValue } from '../values/select-value/select-value';
import { BootstrapClasses as BootstrapClasses, DefaultOptions, NoopClasses } from '../options';
import { ComplexQuery, FilterModel } from '../model';

const Operators = [
    'eq',
    'ne',
    'lt'
];

const complexQuery: ComplexQuery = {
    text: 'My Query',
    filter: {
        and: [{
            field: 'string1',
            op: 'eq',
            value: 'Value1',
        }, {
            field: 'string2',
            op: 'eq',
            value: 'Value2',
        }, {
            field: 'number1',
            op: 'eq',
            value: 42,
        }, {
            field: 'number2',
            op: 'eq',
            value: 42,
        }, {
            field: 'enum',
            op: 'eq',
            value: 'Option1'
        }, {
            field: 'enum',
            op: 'eq',
            value: 'Option2'
        }, {
            or: [{
                field: 'string1',
                op: 'eq',
                value: 'Value1',
            }, {
                field: 'number1',
                op: 'eq',
                value: 42,
            }, {
                field: 'enum',
                op: 'eq',
                value: 'Option1'
            }]
        }],
    },
    sorting: [{
        field: 'string1',
        mode: 'ascending',
    }, {
        field: 'string2',
        mode: 'descending',
    }],
};

const model: FilterModel = {
    operators: [{
        name: 'eq',
        label: 'equal'
    }, {
        name: 'eq',
        label: 'not equal'
    }],
    fields: [{
        name: 'string1',
        label: 'String1',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: StringValue
    }, {
        name: 'string2',
        label: 'String2',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: StringValue
    }, {
        name: 'number1',
        label: 'Number1',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: NumberValue
    }, {
        name: 'number2',
        label: 'Number2',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: NumberValue
    }, {
        name: 'date1',
        label: 'Date1',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: DateValue
    }, {
        name: 'date2',
        label: 'Date1',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: DateValue
    }, {
        name: 'boolean1',
        label: 'Boolean1',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: BooleanValue
    }, {
        name: 'boolean2',
        label: 'Boolean2',
        description: 'Lorem ipsum dolor sit amet',
        operators: Operators,
        component: BooleanValue
    }, {
        name: 'enum',
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

const meta: Meta<Input> = {
    title: 'Input',
    component: Input,
    argTypes: {
    },
    args: {
        model,
        query: undefined,
        options: DefaultOptions,
        isBookmarked: false,
    },
};

export default meta;
type Story = StoryObj<Input>;

export const Primary: Story = {
    args: {
        query: {
            text: 'My Query',
            filter: {
                and: []
            },
            sorting: [],
        }
    }
};

export const Bookmarked: Story = {
    args: {
        query: {
            text: 'My Query',
            filter: {
                and: []
            },
            sorting: [],
        },
        isBookmarked: true,
    }
};

export const NoBookmark: Story = {
    args: {
        query: {
            text: 'My Query',
            filter: {
                and: []
            },
            sorting: [],
        },
        isBookmarked: null,
    }
};

export const Complex: Story = {
    args: {
        query: {
            text: 'My Query',
            filter: {
                and: [{
                    field: 'string1',
                    op: 'eq',
                    value: 'Value1',
                }, {
                    field: 'number1',
                    op: 'eq',
                    value: 42,
                }, {
                    field: 'enum',
                    op: 'eq',
                    value: 'Option1'
                }]
            },
            sorting: [],
        }
    }
};

export const NotScrollable: Story = {
    args: {
        query: complexQuery,
        scrollable: false,
    }
};

export const Expanded: Story = {
    args: {
        query: complexQuery,
        isExpanded: true,
    }
};

export const Unstyled: Story = {
    args: {
        options: {
            ...DefaultOptions,
            cssClasses: NoopClasses,
        },
        query: complexQuery,
        isExpanded: true,
    },
};

export const Bootstrap: Story = {
    args: {
        options: {
            ...DefaultOptions,
            cssClasses: BootstrapClasses,
        },
        query: complexQuery,
        isExpanded: true,
    },
    render: args => ({
        props: args,
        template: `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">

            <filter-input
                [isExpanded]="isExpanded"
                [model]="model"
                [query]="query"
                (queryChange)="queryChange?.($event)"
                [options]="options" />
        `,
    })
};