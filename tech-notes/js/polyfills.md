# Polyfills

## Installing polyfills in React

### Method 1: npm installing the polyfill, and importing it in `index.js`

package.json:
```
"dependencies": {
  "inert-polyfill": "^0.2.5",
  ...
}
```

index.js:
```
import 'inert-polyfill';
```

### Method 2: adding a `script` element at the end of the template html file

## Official polyfills

### Inert

https://github.com/GoogleChrome/inert-polyfill

#### Usage notes

* I've managed to use it by adding `<script src="POLYFILL_FILE_URI"></script>` to my HTML document.
* ... but I've not managed to add it by npm installing it in a react app.

## Other reccommended quality polyfills

### :focus-within

[Scott O'Hara's use](https://github.com/scottaohara/a11y_styled_form_controls/blob/master/src/assets/js/global--focus-within.js)

