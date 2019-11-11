# Sizing in CSS

## Using % sizing

### I can give a dropdown drawer the same width as a dropdown toggle, indirectly, by giving it the same with as the element that wraps both the drawer and the toggle.

See [example](./../../code_examples/2019Q4/0904-Dropdown-in-sass/README.md).

That works because the wrapping element's width is intrinsically set by the width of the toggle.

`/* 1. */`: If I don't  set `mid-width: 100%`, the menu is narrower than the toggle.
I want to size them in relation to each other. But how?

Well, it's simple: they have a common parent (`.dropdown`), and it so happens that the width of the parent is set by the width of the toggle.

html:

```html
<div class="dropdown">
    <button type="button" class="dropdown__toggle">Menu</button>
    <div class="dropdown__drawer">
        <ul class="menu">
            <li><a href="">Samba</a></li>
            <li><a href="">Ricamole</a></li>
            <li><a href="">Casandra</a></li>
            <li><a href="">Balsamic</a></li>
            <li><a href="">Fleurs</a></li>
        </ul>
    </div>
</div>
```

scss:

```scss
.dropdown__drawer {
    display: none;
    position: absolute;
    top: 3.5em;
    left: 0;
    min-width: 100%; /* 1. */

    .dropdown.is-open > & {
        display: block;
    }
}
```