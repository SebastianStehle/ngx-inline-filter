export const DefaultOptions = {
    texts: {
        addComparison: 'Add Filter',
        addGroup: 'Add Group',
        addSorting: 'Add Sorting',
        and: 'And',
        not: 'Not',
        noResults: '- no results -',
        or: 'Or',
        save: 'Save',
        searchPlaceholder: 'Search',
        searchShortcut: 'Search (\'q\')',
        sortAsc: 'Ascending',
        sortDesc: 'Descending',
        sorting: 'Sorting',
    },
    cssClasses: {
        buttonAdd: 'nf-simple-button nf-simple-button-add',
        buttonAddOutline: 'nf-simple-button nf-simple-button-add-outline',
        buttonDefault: (active: boolean) => `nf-simple-button nf-simple-button-default ${active ? 'active' : ''}`,
        buttonSmall: (active: boolean) => `nf-simple-button nf-simple-button-default ${active ? 'active' : ''}`,
        buttonDelete: 'nf-simple-button nf-simple-button-delete',
        dropdown: 'nf-simple-dropdown',
        dropdownMenu: 'nf-simple-dropdown',
        dropdownItem: (selected: boolean) => `nf-simple-dropdown-item ${selected ? 'active' : ''}`,
        dropdownSearch: 'nf-simple-dropdown-search',
        inputCheckbox: 'nf-simple-input-checkbox',
        inputDate: 'nf-simple-input-date',
        inputDropdown: 'nf-simple-input-dropdown',
        inputNumber: 'nf-simple-input-number',
        inputText: 'nf-simple-input-text',
        select: 'nf-simple-input-select'
    }
};

export const BootstrapClasses: typeof DefaultOptions['cssClasses'] = {
    buttonAdd: 'btn',
    buttonAddOutline: 'btn btn-outline-success',
    buttonDefault: (active: boolean) => `btn ${active ? 'fw-bolder' : ''}`,
    buttonSmall: (active: boolean) => `btn btn-sm ${active ? 'fw-bolder' : ''}`,
    buttonDelete: 'btn text-muted',
    dropdown: 'dropdown',
    dropdownMenu: 'dropdown-menu d-block mt-1',
    dropdownItem: (selected: boolean) => `dropdown-item ${selected ? 'active' : ''}`,
    dropdownSearch: 'dropdown-header mb-2',
    inputCheckbox: 'input',
    inputDate: 'form-control',
    inputDropdown: 'form-select text-start',
    inputNumber: 'form-control',
    inputText: 'form-control',
    select: 'form-select text-start'
};

export const NoopClasses: typeof DefaultOptions['cssClasses'] = {
    buttonAdd: '',
    buttonAddOutline: '',
    buttonDefault: () => '',
    buttonSmall: () => '',
    buttonDelete: '',
    dropdown: '',
    dropdownMenu: '',
    dropdownItem: () => '',
    dropdownSearch: '',
    inputCheckbox: '',
    inputDate: '',
    inputDropdown: '',
    inputNumber: '',
    inputText: '',
    select: ''
};

export type FilterOptions = typeof DefaultOptions;