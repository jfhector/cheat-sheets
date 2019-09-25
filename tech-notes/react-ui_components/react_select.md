# React select

## All styling happens in JS

```
<Select
    options={coffeeBrandOptions}
    // defaultValue={{
    //     label: 'Jacobs',
    //     value: 'Jacobs'
    // }}
    value={state.selected.competitor}
    onChange={actions.select.competitor}
    styles={{
        option: (baseStyle: React.CSSProperties) => ({
            ...baseStyle,
            fontSize: 'small',
            backgroundColor: '#ffffff',
            ':hover': {
                backgroundColor: '#cce5ff',
            },
            color: '#333333',
        }),
        indicatorSeparator: (baseStyle: React.CSSProperties) => ({
            ...baseStyle,
            display: 'none',
        }),
        dropdownIndicator: (baseStyle: React.CSSProperties) => ({
            ...baseStyle,
            display: 'none',
        }),
        control: (baseStyle: React.CSSProperties) => ({
            ...baseStyle,
            minHeight: 30,
        }),
        valueContainer: (baseStyle: React.CSSProperties) => ({
            ...baseStyle,
            fontSize: 'small',
        }),
    }} />
/>
```

## Modifying the component OR Composing with other components

I know that it is possible to change parts of the component, but I don't know how.

So, for now, I've been adding components on top, eg to add a caret down:

```
<span
    className={styles.rightNodeSelectorContainer}
>
    <Select
        options={coffeeBrandOptions}
        // defaultValue={{
        //     label: 'Jacobs',
        //     value: 'Jacobs'
        // }}
        value={state.selected.competitor}
        onChange={actions.select.competitor}
        styles={{
            option: (baseStyle: React.CSSProperties) => ({
                ...baseStyle,
                fontSize: 'small',
                backgroundColor: '#ffffff',
                ':hover': {
                    backgroundColor: '#cce5ff',
                },
                color: '#333333',
            }),
            indicatorSeparator: (baseStyle: React.CSSProperties) => ({
                ...baseStyle,
                display: 'none',
            }),
            dropdownIndicator: (baseStyle: React.CSSProperties) => ({
                ...baseStyle,
                display: 'none',
            }),
            control: (baseStyle: React.CSSProperties) => ({
                ...baseStyle,
                minHeight: 30,
            }),
            valueContainer: (baseStyle: React.CSSProperties) => ({
                ...baseStyle,
                fontSize: 'small',
            }),
        }}
    />

    <img 
        className={styles.competitorSelectorCaret}
        src={require('../../../assets/PROTOSVG_UI_LIB_DropdownCaret.svg')}
    />
</span>
```

css:

```
.rightNodeSelectorContainer {
    display: inline-block;
    width: 230px;
    position: relative;
}

.rightNodeSelectorContainer .competitorSelectorCaret {
    position: absolute;
    top: 10px;
    right: 5px;
}
```