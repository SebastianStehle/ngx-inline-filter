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
        buttonDelete: 'nf-simple-button nf-simple-button-delete',
        buttonGroup: 'nf-simple-button-group',
        buttonLogical: (active: boolean) => `nf-simple-button nf-simple-button-default ${active ? 'active' : ''}`,
        buttonNegate: (active: boolean) => `nf-simple-button nf-simple-button-default ${active ? 'active' : ''}`,
        dropdown: 'nf-simple-dropdown',
        dropdownItem: (selected: boolean) => `nf-simple-dropdown-item ${selected ? 'active' : ''}`,
        dropdownMenu: 'nf-simple-dropdown',
        dropdownSearch: 'nf-simple-dropdown-search',
        inputCheckbox: 'nf-simple-input-checkbox',
        inputDate: 'nf-simple-input-date',
        inputDropdown: 'nf-simple-input-dropdown',
        inputNumber: 'nf-simple-input-number',
        inputText: 'nf-simple-input-text',
        root: '',
        select: 'nf-simple-input-select'
    }
};

export const BootstrapClasses: typeof DefaultOptions['cssClasses'] = {
    buttonAdd: 'btn',
    buttonAddOutline: 'btn btn-outline-success',
    buttonDefault: (active: boolean) => `btn ${active ? 'fw-bolder' : ''}`,
    buttonDelete: 'btn text-muted',
    buttonGroup: 'btn-group',
    buttonLogical: (active: boolean) => `btn btn-sm ${active ? 'btn-secondary' : ''}`,
    buttonNegate: (active: boolean) => `btn ${active ? 'btn-secondary' : ''}`,
    dropdown: 'dropdown',
    dropdownItem: (selected: boolean) => `dropdown-item ${selected ? 'active' : ''}`,
    dropdownMenu: 'dropdown dropdown-menu d-block mt-1',
    dropdownSearch: 'dropdown-header mb-2',
    inputCheckbox: 'input',
    inputDate: 'form-control',
    inputDropdown: 'form-select text-start',
    inputNumber: 'form-control',
    inputText: 'form-control',
    root: 'form-control',
    select: 'form-select text-start'
};

export const NoopClasses: typeof DefaultOptions['cssClasses'] = {
    buttonAdd: '',
    buttonAddOutline: '',
    buttonDefault: () => '',
    buttonDelete: '',
    buttonGroup: '',
    buttonLogical: () => '',
    buttonNegate: () => '',
    dropdown: '',
    dropdownItem: () => '',
    dropdownMenu: '',
    dropdownSearch: '',
    inputCheckbox: '',
    inputDate: '',
    inputDropdown: '',
    inputNumber: '',
    inputText: '',
    root: '',
    select: ''
};

export type FilterOptions = typeof DefaultOptions;