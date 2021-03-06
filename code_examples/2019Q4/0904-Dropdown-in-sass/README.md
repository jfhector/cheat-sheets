# 0904-Dropdown-in-sass

[See it live](https://jfhector.github.io/cheat-sheets/code_examples/2019Q4/0904-Dropdown-in-sass/index.html)

## Notes

### I can give a dropdown drawer the same width as a dropdown toggle, indirectly, by giving it the same with as the element that wraps both the drawer and the toggle.

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

### Using SCSS modules and BEM

#### Importing all module into a main file

```scss
@import 'normalize';

html {
    box-sizing: border-box;
}

*, ::before, ::after {
    box-sizing: inherit;
}

@import 'dropdown';
@import 'menu';
```

Note the order of SCSS imports:
* normalize
* before project defaults
* before project modules

Note: I could have put the defaults into a separate 'default' file.

#### SCSS nested syntax

```scss
.dropdown {
    display: inline-block;
    position: relative;
}

.dropdown__toggle {
    min-width: 14em;
    border: 1px solid black;
    padding: 1em;
    font-size: 1rem;

    &::after {
        content: '';
        display: inline-block;
        border: 4px solid;
        border-color: black transparent transparent;
        margin-left: 1em;

        .dropdown.is-open > & {
            border-color: transparent transparent black;
        }
    }
}
```
