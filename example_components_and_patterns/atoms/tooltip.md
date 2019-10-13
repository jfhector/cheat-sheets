# Tooltip

### Making a label tooltip and description tooltip

See [example](./../../code_examples/2019Q4/0921HIC-Tooltips_and_toggletips/README.md).

Note: Label tooltips don't help touch users. As such, they are only OK if pressing the wrong button doesn't have consequences (e.g. for tabs in an app).

Possible improvement: I'd rather not use `data-module="..."` attributes when I'm not using them in JS, because to me they imply that they are JS hooks. Use a `class` instead.

```html
<div data-module="description-tooltip">
    <button class="stack-0.5" aria-describedby="description" aria-labelledby="badge label">
        <img alt="" src="assets/bin-icon.svg">
        <span id="label">Deleted items</span>
    </button>
    
    <span id="badge" aria-hidden="true">3</span>
    <span id="description" role="tooltip">Click here to see your deleted items.</span>
</div>
```

```css
[data-module=description-tooltip] {
  position: relative;
  width: max-content;
}

[data-module=description-tooltip] > [role=tooltip] {
  position: absolute;
  min-width: max-content;
  top: 50%;
  /* left: 7rem; */
  left: calc(100% + 1rem); /* I prefer this */
  transform: translateY(-50%);
  display: none;
}

[data-module=description-tooltip]:hover > [role=tooltip],
[data-module=description-tooltip] > button:focus ~ [role=tooltip],
[data-module=description-tooltip] > input:focus ~ [role=tooltip] {
  display: block;
}
```