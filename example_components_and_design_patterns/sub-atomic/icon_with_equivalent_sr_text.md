# Icon with equivalent screen-reader text

## Combining `aria-hidden="true"` and `class="!visually-hidden"` to create a text alternative to an icon

See [example](./../../code_examples/2019Q4/0921HIC-Tooltips_and_toggletips/README.md).

```html
<button type="button" data-toggle-tip-content="Notifications will tell you about activity going on in the app, like receiving messages or likes">
    <span aria-hidden="true">i</span>
    <span class="!visually-hidden">More information</span>
</button>
```