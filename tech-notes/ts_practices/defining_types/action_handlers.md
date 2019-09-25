# Action handlers

## Action handler arguments

When defining action handler functions, we need to be clear about what (if any) argument the function needs to receive, and the type of that argument. Same for return types.

### Action handlers that don't take any argument

If an action handler function doesn't need to know anything about the event – other than the fact that it happened – the action handler will take no argument.

This is often the case for click action handlers.

#### Eg

```js
updateView: () => {
    this.setState(
        (prevState: AppState) => ({
            displayedFilters: prevState.selectedFilters,
            dataViewNeedsUpdating: false,
        })
    )
}
```

#### Eg

```js
conditionallySetMeasureInDetailBoardHeaderVisibleStateBasedOnScrollY: () => {
    this.setState({
          measureInDetailBoardHeaderVisible: (
            (this.refToMeasureInDetailBoardHeaderContainingDiv.getBoundingClientRect() as DOMRect).top > 0
          ) ? false : true,
    })
}
```

#### Eg

```js
toggleMeasuresSummaryExpanded: () => {
    this.setState(
        (prevState: AppState) => ({
            measuresSummaryExpanded: !prevState.measuresSummaryExpanded,
        })
    )
}
```

### Action handlers that take an argument of type union of magic strings

Select elements return a string value, and use an array of string values to know what options to display.

The type of their input array can be an union of magic strings, each representing one of the options to select from.

The action handling function that gets triggered when their value change should be of type `(newlySelectedOption: OptionName) => Void`.

```js
changeSelectedSubcategory: (newlySelectedSubcategory: MedicineSubcategoryName) => {
    this.setState(
        (prevState: AppState) => ({
            selectedFilters: {
                ...prevState.selectedFilters,
                subcategory: newlySelectedSubcategory,
            },
            dataViewNeedsUpdating: true,
        } as AppState)
    )
},
```

## Typing action handlers passed down as props

It's not enough to type the arguments than action handler functions receive.

When a component receives an action handler function as a prop, it also needs to specify it's type so that the prop gets validated.

#### Typing click handler functions

Click event handlers have the type `React.MouseEventHandler<HTMLElement>` from React's types library.
(I don't think it's useful to be more specific on the nature of the HTMLElement here).

Eg from CollapseButton.tsx

```js
interface Props {
    // Instance-specific data extracted from appState upsteam
    expanded?: boolean

    // Instance-specific function extracted from actions upstream
    handleClick?: React.MouseEventHandler<HTMLElement>
}
```