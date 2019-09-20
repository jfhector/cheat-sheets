# 0904-Dropdown-in-sass

[See it live](https://jfhector.github.io/cheat-sheets/code_examples/2019Q4/0904-Dropdown-in-sass/index.html)

## What does it demonstrate?

### Sizing a dropdown drawer in relation to the dropdown toggle, indirectly, by sizing it in relation to their common parent

`/* 1. */`: If I don't  set `mid-width: 100%, the menu is narrower than the toggle`.
I want to size them in relation to each other. But how?

Well, it's simple: they have a common parent (.dropdown), and it so happens that the width of the parent is set by the width of the toggle.

```
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

```
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

Note the order in code.
Note: I could have put the defaults into a separate 'default' file.

```
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

## Notes

* I can size a dropdown drawer in relation to the dropdown toggle, indirectly, by sizing it in relation to their common parent.

* Order of CSS imports:
  * normalize
  * before project defaults
  * before project modules
