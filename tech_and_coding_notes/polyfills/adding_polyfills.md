# Adding polyfills

## Conditionally adding polyfills, if possible without causing delays

[Polyfills - HTTP203](https://www.youtube.com/watch?v=RoVy9EoIloQ)

https://philipwalton.com/articles/loading-polyfills-only-when-needed/

## Adding polyfills in React

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

