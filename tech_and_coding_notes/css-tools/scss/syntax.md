# SCSS Syntax

## Examples

### SCSS nested syntax

See [example](./../../../code_examples/2019Q4/0904-Dropdown-in-sass/README.md).

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
