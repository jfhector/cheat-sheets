# Notification badge

## Lessons

### Making a notification badge. And using `aria-labelledby` to label an element using two elements (not just one), and potentially aria-hidden to avoid repetition

See [example](./../../code_examples/2019Q4/0921HIC-Tooltips_and_toggletips/README.md).

Note how the badge is included in `aria-labelledby`, together with the label.

```html
<div data-module="label-tooltip">
    <button aria-labelledby="badge label">
        <img alt="" src="assets/bin-icon.svg">
    </button>
    
    <span id="badge" aria-hidden="true">3</span>
    <span id="label" role="tooltip">Deleted items</span>
</div>
```

```css
[aria-hidden=true] {
  position: absolute;
  right: 0;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 1.2em;
  height: 1.2em;
  text-align: center;
  line-height: 1.3;
}
```