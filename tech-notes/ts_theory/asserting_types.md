# Asserting types

## Using `as`

Note that type assertion needs to happen on the right hand side of the assignment operation.

### Eg tipping the compiler

```js
const selectedCategory = categories.filter( category => category.name === props.categoryName )[0] as CategoryWithChildren                           // !! Filter returns an array
```

### Eg using type assertion to ensure that TS types the value I switch on as tightly as it should

Eg in this example, although I _know_ that `intFrom0To4` can only be 0, 1, 2, 3 or 4, the TS compiler isn't smart enough to see that:

```js
// Deterministically derive an integer from 0 to 4 from appState
const numberThatIsDifferentForDifferentValuesOfDisplayedFilters = Object.values(appState.displayedFilters).join().length + Number.parseInt(appState.displayedFilters.duration) + Number.parseInt(appState.displayedFilters.dates)

const intFrom0To4 = numberThatIsDifferentForDifferentValuesOfDisplayedFilters % 5

// TS thinks that type of intFrom0to4 is number
```

I can _assert_ that the type of `numberThatIsDifferentForDifferentValuesOfDisplayedFilters % 5` is 0 | 1 | 2 | 3 | 4 by writing:

```js
const intFrom0To4 = numberThatIsDifferentForDifferentValuesOfDisplayedFilters % 5 as (0 | 1 | 2 | 3 | 4)
```

This then allows me to use `intFrom0To4` in an exhaustive switch block:

```js
switch (intFrom0To4) {
    case 0:
        return dataForAllMeasuresBasedOnAppState0
    case 1:
        return dataForAllMeasuresBasedOnAppState1
    case 2:
        return dataForAllMeasuresBasedOnAppState2
    case 3:
        return dataForAllMeasuresBasedOnAppState3
    case 4:
        return dataForAllMeasuresBasedOnAppState4
    default:
        const _exhaustiveCheck: never = intFrom0To4
        return _exhaustiveCheck
}
```

### Eg using type assertion to tip the compiler that a prop with a defaultProp will be non-null

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
