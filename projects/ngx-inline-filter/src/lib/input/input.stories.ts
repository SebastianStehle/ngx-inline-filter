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
    fullText: 'My Query',
    filter: {
        and: [{
            path: 'string1',
            op: 'eq',
            value: 'Value1',
        }, {
            path: 'string2',
            op: 'eq',
            value: 'Value2',
        }, {
            path: 'number1',
            op: 'eq',
            value: 42,
        }, {
            path: 'number2',
            op: 'eq',
            value: 42,
        }, {
            path: 'enum',
            op: 'eq',
            value: 'Option1'
        }, {
            path: 'enum',
            op: 'eq',
            value: 'Option2'
        }, {
            or: [{
                path: 'string1',
                op: 'eq',
                value: 'Value1',
            }, {
                path: 'number1',
                op: 'eq',
                value: 42,
            }, {
                path: 'enum',
                op: 'eq',
                value: 'Option1'
            }]
        }],
    },
    sort: [{
        path: 'string1',
        order: 'ascending',
    }, {
        path: 'string2',
        order: 'descending',
    }],
};

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
            fullText: 'My Query',
            filter: {
                and: []
            },
            sort: [],
        }
    }
};

export const Empty: Story = {
    args: {
        model: { fields: [], operators: [] },
    }
};

export const LogicalAtStart: Story = {
    args: {
        query: {
            fullText: 'My Query',
            filter: {
                and: []
            },
            sort: [],
        },
        logicalSwitchPosition: 'start'
    }
};

export const LogicalHidden: Story = {
    args: {
        query: {
            fullText: 'My Query',
            filter: {
                and: []
            },
            sort: [],
        },
        logicalSwitchPosition: 'none'
    }
};

export const Bookmarked: Story = {
    args: {
        query: {
            fullText: 'My Query',
            filter: {
                and: []
            },
            sort: [],
        },
        isBookmarked: true,
    }
};

export const NoBookmark: Story = {
    args: {
        query: {
            fullText: 'My Query',
            filter: {
                and: []
            },
            sort: [],
        },
        isBookmarked: null,
    }
};

export const Complex: Story = {
    args: {
        query: {
            fullText: 'My Query',
            filter: {
                and: [{
                    path: 'string1',
                    op: 'eq',
                    value: 'Value1',
                }, {
                    path: 'number1',
                    op: 'eq',
                    value: 42,
                }, {
                    path: 'enum',
                    op: 'eq',
                    value: 'Option1'
                }]
            },
            sort: [],
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

export const Template: Story = {
    args: {
        query: {
            fullText: 'My Query',
            filter: {
                and: [
                    { path: 'custom1', op: 'eq', value: 42 },
                    { path: 'number1', op: 'eq', value: 42 },
                ]
            },
            sort: [],
        },
        isExpanded: true,
        model: {
            operators: model.operators,
            fields: [
                ...model.fields,
                {
                    path: 'custom1',
                    label: 'Custom1',
                    description: 'Lorem ipsum dolor sit amet',
                    operators: Operators,
                }
            ]
        }
    },
    render: args => ({
        props: args,
        template: `
            <filter-input
                [isExpanded]="isExpanded"
                [model]="model"
                [query]="query"
                (queryChange)="queryChange?.($event)"
                [options]="options"
                [valueTemplate]="valueTemplate" />

            <ng-template #valueTemplate>
                <div class="nf-operator-text" style="line-height: 1.8em">
                    CUSTOM
                </div>
            </ng-template>
        `,
    })
};