# Measuring elements

## Element.getBoundingClientRect

Returns the size of an element and its position relative to the viewport.

### Use case: I can use Element.getBoundingClientRect() to create an action that sets state based on the element's width, height, top, bottom, left or right

#### Eg use case

For example, I can use Element.getBoundingClientRect() to create an action that sets state based on whether the element's bounding client rect top value is 0 or less (meaning it has at least partially scrolled out of view at the top – or that its position has been locked at 0 because it is sticky)

`measureInDetailBoardHeaderContainingDivBoundingClientRect.top > 0` means that the element hasn't yet begun to be scrolled out of the view towards the top

`measureInDetailBoardHeaderContainingDivBoundingClientRect.top <= 0` means that the element has already begun to be scrolled out of the view towards the top, or has completely scrolled out of view, or that its `top` value has been stock at `0` because it is sticky.

Here's how to implement such an action.

```
actions = {
    conditionallySetMeasureInDetailBoardHeaderVisibleStateBasedOnScrollY: () => {
        let measureInDetailBoardHeaderContainingDivBoundingClientRect = this.refToMeasureInDetailBoardHeaderContainingDiv.getBoundingClientRect() as DOMRect

        this.setState({
              measureInDetailBoardHeaderVisible: measureInDetailBoardHeaderContainingDivBoundingClientRect.top > 0 ? false : true,
        })
    },
}

```

##### Something then needs to trigger this action. I can register an event listener that calls this action whenever the window is scrolled.

```
// Event listeners

componentDidMount() {
    window.addEventListener(
        'scroll',
        this.actions.conditionallySetMeasureInDetailBoardHeaderVisibleStateBasedOnScrollY
    )
}

componentWillUnmount() {
    window.removeEventListener(
        'scroll',
        this.actions.conditionallySetMeasureInDetailBoardHeaderVisibleStateBasedOnScrollY
    )
}
```

#### As an another example

I could use Element.getBoundingClientRect() to create an action that sets state based on whether the element's bounding client rect top value is less then less than its height (meaning it has completely scroll out of view at the top).

### Typing

Note of care with TS: I need to use type assertion when using `Element.getBoundingClientRect()` in TS.

The TS type of the return value is `DOMRect`.


```
let measureInDetailBoardHeaderContainingDivBoundingClientRect = this.refToMeasureInDetailBoardHeaderContainingDiv.getBoundingClientRect() as DOMRect
```
