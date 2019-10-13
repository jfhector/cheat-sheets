# Toggletip

## Lessons

### When making a toggletip, delete the `innerHTML` of a `<span role="status"></span>`, then repopulate it after a 100ms `setTimeout`. Take the content from a `data-toggle-tip-content` attribute on the button

See [example](./../../code_examples/2019Q4/0921HIC-Tooltips_and_toggletips/README.md)

HTML:
```html
<div data-module="toggle-tip">
    <button type="button" data-toggle-tip-content="Notifications will tell you about activity going on in the app, like receiving messages or likes">
        <span aria-hidden="true">i</span>
        <span class="!visually-hidden">More information</span>
    </button>
    
    <span role="status"></span>
</div>
```

JS:
```js
function show() {
    $liveRegion.innerHTML = '';
    setTimeout(() => {
        $liveRegion.innerHTML = `<span">${toggleTipContent}</span>`;
    }, 100);
}
```

### Dismiss a toggletip on escape and when a click is registered anywhere outside the toggle button, by listening for `click` events on the `document`, and checking whether `$toggleButton.contains(e.target)`

See [example](./../../code_examples/2019Q4/0921HIC-Tooltips_and_toggletips/README.md)

```js
document.addEventListener('click', (e) => {
    if (!$toggleButton.contains(e.target)) {
        hide();
        e.stopPropagation();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        hide();
    }
});
```