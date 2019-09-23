# 0923rjs-forwarding-refs

[See the CodeSandbox](https://codesandbox.io/s/stupefied-joliot-qm81x?fontsize=14)

## What does it demonstrate?

* Adding ref forwarding support to a component. So parent components using it can get a ref to the underlying DOM element and access it if necessary — just like if they used a DOM button directly.

* Ensuring that a descriptive name appears in the React DevTools when using ref forwarding.

## Notes

### Adding ref forwarding support to a component. So parent components using it can get a ref to the underlying DOM element and access it if necessary — just like if they used a DOM button directly.

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

* A named function (like `fancyTextInput` here) appears named in React Devtools.
An anonymous function would just be labelled as 'forwardRef'.

### When a component has been set up with `React.forwardRef`, I can pass it a ref, that will be passed to the underlying DOM element

```js
class TextInputWithFocusButton extends React.Component<{}, {}> {
  // I'm going to pass down this ref to the child component 'FancyTextInput',
  // so that it can be assigned a text input inside that child component
  refForTextInputInsideFancyTextInputComponent: React.RefObject<HTMLInputElement> = React.createRef();

  ...

  render() {
    return (
      <>
        <FancyTextInput ref={this.refForTextInputInsideFancyTextInputComponent} color="pink" />

        <button type="button" onClick={this.focusInput}>
          Focus text input
        </button>
      </>
    );
  }
```
