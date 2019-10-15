# Inert

## Lessons

### Using `inert`

See [example](./../../code_examples/2019Q4/1024-Modal_React_Component/README.md).

1. Add the [`inert` polyfill](https://github.com/GoogleChrome/inert-polyfill)
   * (See separate tech notes on polyfills)
 
2. Get an array of all the children of `document.body`

3. When a modal has just mounted, set the `inert` attribute on all of them **before** appending the element that will contain the modal to `document.body`
4. When a modal is about to dismount, **after** removing the element that contained the modal from `document.body`, remove the `inert` attribute on all the children of `document.body`

```tsx
  useEffect(() => {
    ...

    const childrenOfBodyElement = Array.from(document.body.children);
    childrenOfBodyElement.forEach(_ => _.setAttribute('inert', ''));
    
    ...

    return function cleanup() {
      document.body.removeChild($portalTarget);
      childrenOfBodyElement.forEach(_ => _.removeAttribute('inert'));

      ...
    }
  }, [$portalTarget]);
```