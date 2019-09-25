# Props

## Using `static defaultProps` with TypeScript

```js
type OptionProps = {
    text: string, 
    disabled?: boolean, 
    onClick?: (selectedOption: ViewConfiguration | any) => void,
    key?: string,
}

class Option extends React.Component<OptionProps, {}> {
    static defaultProps = {
        disabled: false, 
        onClick: () => {},
    }

    render() {
```

## Passing down React nodes as props

If I pass react nodes to a component, what I'm passing needs to be only _1_ node. So if I want to pass several, I can wrap them in a `div` or a react fragment `<>`.

```js
rightNode={
    <> 
        <span
            className={s.measureInDetailBoardRightNodeLabel}
        >
            Selected measure:
        </span>
        <Selector
            optionsArray={measureOptions}
            value={`${selectedMeasure}`}
            handleSelectorChange={changeSelectedMeasure}
        />
    </>
}
```