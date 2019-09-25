# React types

## Refs

* When creating a ref for a Class Component instance, the type of the ref is `React.RefObject<MyComponent>`. See [Martin Hotell's article](https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315) for more detail. See [code example](./../../code_examples/2019Q4/0923rjs-refs_for_DOM_elements_and_class_instances/README.md).

### Ref forwarding

```js
export const FancyTextInput = React.forwardRef<HTMLInputElement, Props>(
  function fancyTextInput(props, ref) {
    return (
      <input
        type="text"
        className={props.color === "purple" ? "FancyTextInput--purple" : "FancyTextInput--pink"}
        ref={ref}
      />
    );
  }
);
```

* React.forwardRef is a generic type.
  * The first type is the type of the element that will be given the ref (eg. HTMLInputElement, or MyComponent)
  * The second type is the type of the props

* Alternatively to what I did above, I could create a 'RefForFancyTextInput' type and export it for when the ref is created. But after trying that, it's had no benefits. Instead ...
  * here I specify the type of the element that will receive the ref ('HTMLInputElement')
  * and when the ref object is created, I specify the corresponding type ('React.RefObject<HTMLInputElement>')
    TypeScript will flag any differences.
    This is a simplified version of this https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315

See [code example](./../../code_examples/2019Q4/0923rjs-forwarding-refs/README.md).

## Event handlers

### Mouse event handlers have a React.MouseEventHandler<HTMLElement> type

```js
interface Props {
    // Instance-specific data extracted from appState upsteam
    expanded?: boolean

    // Instance-specific function extracted from actions upstream
    handleClick?: React.MouseEventHandler<HTMLElement>
}
```

### Keyboard events can be typed with KeyboardEvent

```
handleKeyDownEvent: (event: KeyboardEvent) => {
    if (event.key !== 'Enter') { return }
    if (this.state.viewTitleInputIsFocused !== true) { return }

    // Blur the title input (this triggers the event listener on that element, which toggles the isFocused state)
    this.refToViewTitleInput.blur()

    // Assign the current selected filters to this.state.lastSavedFilters
    this.setState({
        previouslySavedFilters: this.state.selectedFilters,
    })

    // If viewTitle is '', reset it to the default
    if (this.state.viewTitle === '') {
        this.setState({
            viewTitle: INITIAL_VIEW_TITLE
        })
    }
},
```

## Children props (or anything renderable by React) can be typed with React.ReactNode

If a prop can contain 'anything that can be rendered by React` (e.g. a children prop), the type of `React.ReactNode`

```
interface Props {
    children: React.ReactNode
    typeOption?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
    dismissable?: boolean
```

## Default props: using type assertion to tip the compiler that a prop with a defaultProp will be non-null

Eg
```js
type Props = {
    title: string
    children: React.ReactNode
    headerIsSticky?: boolean
    rightNode?: React.ReactNode
    initiallyExpanded?: boolean
}

type State = {
    headerHighlighted: boolean,
    expanded: boolean,
}

export class CollapsibleContentBoard extends React.Component<Props, State> {
    static defaultProps = {
        initiallyExpanded: false,
        rightNode: null,
        headerIsSticky: false,
    }

    constructor(props: Props) {
        super(props)
        this.state = {
            headerHighlighted: false,
            expanded: props.initiallyExpanded as boolean
        }
    }
```
