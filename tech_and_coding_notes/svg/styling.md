# Styling SVGs

## SVG attributes

### The SVG `fill-rule` attribute

The [fill-rule attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule) is a presentation attribute defining the algorithm to use to determine the inside part of a shape.

#### Value: `evenodd`

The value evenodd determines the "insideness" of a point in the shape by drawing a ray from that point to infinity in any direction and counting the number of path segments from the given shape that the ray crosses. If this number is odd, the point is inside; if even, the point is outside.

## CSS properties

### The CSS `fill` property

The CSS `fill` property is for styling SVGs.

https://css-tricks.com/almanac/properties/f/fill/

#### Example

https://scottaohara.github.io/a11y_styled_form_controls/src/search/

https://github.com/scottaohara/a11y_styled_form_controls/blob/master/src/assets/css/search-component.css

```css
.search-widget > [type="submit"]:focus svg,
.search-widget > [type="submit"]:not([disabled]):hover svg {
	fill: #fff;
}
```

### The 