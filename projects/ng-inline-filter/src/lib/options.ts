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
        buttonAdd: 'nf-button nf-button-add2',
        buttonAddOutline: 'nf-button nf-button-add-outline',
        buttonDefault: (active: boolean) => `nf-button nf-button-default ${active ? 'active' : ''}`,
        buttonSmall: (active: boolean) => `nf-button nf-button-default ${active ? 'active' : ''}`,
        buttonDelete: 'nf-button nf-button-default nf-comparison-delete',
        dropdown: 'nf-dropdown',
        dropdownMenu: 'nf-dropdown',
        dropdownItem: (selected: boolean) => `nf-dropdown-item ${selected ? 'active' : ''}`,
        dropdownSearch: 'nf-dropdown-search',
        inputCheckbox: 'nf-input-checkbox',
        inputDate: 'nf-input-date',
        inputDropdown: 'nf-input-dropdown',
        inputNumber: 'nf-input-number',
        inputText: 'nf-input-text',
        select: 'nf-input-select'
    }
}

export const BootstrapClasses: typeof DefaultOptions['cssClasses'] = {
    buttonAdd: 'btn',
    buttonAddOutline: 'btn btn-outline-success btn-sm',
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

export type Options = typeof DefaultOptions;