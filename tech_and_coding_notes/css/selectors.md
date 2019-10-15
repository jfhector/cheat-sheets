# CSS Selectors

## Using CSS selectors in JS to get elements

### Using `$==""` in the attribute selector, to select all elements that match based on the end of a string

See [example](./../../code_examples/2019Q4/0920HIC-Tabbed_interfaces_modified_like_APG/README.md).

```html
<section id="section-1-panel" aria-labelledby="section-1-tab">
    ...
</section>

<section id="section-2-panel" aria-labelledby="section-2-tab">
    ...
</section>

<section id="section-3-panel" aria-labelledby="section-3-tab">
    ...
</section>

<section id="section-4-panel" aria-labelledby="section-4-tab">
    ...
</section>
```

```js
const tabPanels = $tabInterface.querySelectorAll('section[id$="-panel"]');
```