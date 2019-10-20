# `aria-label` and `aria-labelledby`

## `aria-label` doesn't work when put on an HTML element that won't be in the accessibility tree, like a `div` or a `span`

(I imagine that the same applies to `aria-labelledby`)

### Consequence: icon fonts need `role='img'`, otherwise their alternative text via `aria-label` doesn't get read out by screen readers

```html
<p>
  Have a great day 
  <span class="fa fa-smile-o" role="img" aria-label="Smiley face"></span>
</p>
```

