# HTML `img` element with an `svg` file as a `src`

## All SVG <img> elements SHOULD be set to role="img".

To ensure the widest range of assistive technologies recognizes the SVG as an image, add role="img" to the <img> element.

```html
<img src="somesvg.svg" role="img">
```

Deque WAS course Oct 2019