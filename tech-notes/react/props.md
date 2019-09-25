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

