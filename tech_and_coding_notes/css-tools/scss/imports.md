# SCSS imports

## Issue

SCSS imports is being depracated and replaced by something else.

## Examples

### Importing all module into a main file

See [example](./../../../code_examples/2019Q4/0904-Dropdown-in-sass/README.md).

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
