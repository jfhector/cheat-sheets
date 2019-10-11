# Web APIs types

## Element

### Element.getBoundingClientRect

I need to use type assertion when using `Element.getBoundingClientRect()` in TS.

The TS type of the return value is `DOMRect`.


```
let measureInDetailBoardHeaderContainingDivBoundingClientRect = this.refToMeasureInDetailBoardHeaderContainingDiv.getBoundingClientRect() as DOMRect
```

## Events

### Types of change events (for checkboxes, radios, selects)

```tsx
const handleSelectedLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => { ... }
```

