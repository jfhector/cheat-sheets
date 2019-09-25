# Web APIs types

### Element.getBoundingClientRect

I need to use type assertion when using `Element.getBoundingClientRect()` in TS.

The TS type of the return value is `DOMRect`.


```
let measureInDetailBoardHeaderContainingDivBoundingClientRect = this.refToMeasureInDetailBoardHeaderContainingDiv.getBoundingClientRect() as DOMRect
```
