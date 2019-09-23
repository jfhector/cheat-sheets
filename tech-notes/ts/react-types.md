# React types

## Refs

* When creating a ref for a Class Component instance, the type of the ref is `React.RefObject<MyComponent>`. See [Martin Hotell's article](https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315) for more detail. See [code example](./../../code_examples/2019Q4/0923rjs-refs_for_DOM_elements_and_class_instances/README.md).

### Ref forwarding

```js
export const FancyTextInput = React.forwardRef<HTMLInputElement, Props>(
  function fancyTextInput(props, ref) {
    return (
      <input
        type="text"
        className={props.color === "purple" ? "FancyTextInput--purple" : "FancyTextInput--pink"}
        ref={ref}
      />
    );
  }
);
```

* React.forwardRef is a generic type.
  * The first type is the type of the element that will be given the ref (eg. HTMLInputElement, or MyComponent)
  * The second type is the type of the props

* Alternatively to what I did above, I could create a 'RefForFancyTextInput' type and export it for when the ref is created. But after trying that, it's had no benefits. Instead ...
  * here I specify the type of the element that will receive the ref ('HTMLInputElement')
  * and when the ref object is created, I specify the corresponding type ('React.RefObject<HTMLInputElement>')
    TypeScript will flag any differences.
    This is a simplified version of this https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315

See [code example](./../../code_examples/2019Q4/0923rjs-forwarding-refs/README.md).