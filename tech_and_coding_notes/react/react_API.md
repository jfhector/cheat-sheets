# React API

## `React.Children`

React.Children provides utilities for dealing with the this.props.children opaque data structure.

### `React.Children.map`: `using React.Children.map(children, fn)` to iterate over a component's children

`React.Children.map(children, function[(thisArg)])`

Invokes a function on every immediate child contained within children with this set to `thisArg`. If children is an array it will be traversed and the function will be called for each child in the array. If children is null or undefined, this method will return null or undefined rather than an array.

Note: If children is a Fragment it will be treated as a single child and not traversed.

#### Example usage

In TenonUI's `Disclosure.Target` component, `React.Children.map` is used to iterate over all the children passed to the `Disclosure.Target` component, in order to merge in the `hidden` prop/attribute on each of them.

```jsx
const Target = ({ children, useHidden, deactivate }) => (
    <DisclosureContext.Consumer>
        {({ expanded, globalHidden }) => {
            const isExpanded = globalHidden ? false : expanded;
            return useHidden === true || useHidden === 'true'
                ? Children.map(children, child =>
                      cloneElement(child, {
                          hidden: isExpanded || deactivate ? null : 'hidden'
                      })
                  )
                : isExpanded || deactivate
                ? children
                : null;
        }}
    </DisclosureContext.Consumer>
);
```

## `React.cloneElement`: using `React.cloneElement` to merge in an additional attribute/prop to a component dynamically

```js
React.cloneElement(
  element,
  [props],
  [...children]
)
```

Clone and return a new React element using element as the starting point. The resulting element will have the original element’s props with the new props merged in shallowly. New children will replace existing children. key and ref from the original element will be preserved.

This API was introduced as a replacement of the deprecated `React.addons.cloneWithProps()`.

### Example usage

In TenonUI's `Disclosure.Target` component, `React.cloneElement` is used to merge the `hidden` prop/attribute on all children of `Disclosure.Target`.

```jsx
const Target = ({ children, useHidden, deactivate }) => (
    <DisclosureContext.Consumer>
        {({ expanded, globalHidden }) => {
            const isExpanded = globalHidden ? false : expanded;
            return useHidden === true || useHidden === 'true'
                ? Children.map(children, child =>
                      cloneElement(child, {
                          hidden: isExpanded || deactivate ? null : 'hidden'
                      })
                  )
                : isExpanded || deactivate
                ? children
                : null;
        }}
    </DisclosureContext.Consumer>
);
```
