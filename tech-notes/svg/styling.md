# Styling SVGs

## CSS

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