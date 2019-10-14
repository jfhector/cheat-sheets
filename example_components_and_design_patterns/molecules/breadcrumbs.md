# Breadcrumbs

## Summary

* Note that the last element (with `aria-current="page"`) is a link (with an `href`) so that screen reader users using TAB or navigation by links find the current page, and understand the pattern.
* List semantics in Safari are re-added by adding a zero-width space on `li::before`.

```css
.list li:before {
  content: "\200B"; /* add zero-width space */
  position: absolute; /* addition */
}
```

## Master implementation: Scott O'Hara's

https://scottaohara.github.io/a11y_breadcrumbs/