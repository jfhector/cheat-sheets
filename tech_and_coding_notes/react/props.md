# Props

## Using `static defaultProps` with TypeScript

```js
type OptionProps = {
    text: string, 
    disabled?: boolean, 
    onClick?: (selectedOption: ViewConfiguration | any) => void,
    key?: string,
}

class Option extends React.Component<OptionProps, {}> {
    static defaultProps = {
        disabled: false, 
        onClick: () => {},
    }

    render() {
```

## Passing down React nodes as props

If I pass react nodes to a component, what I'm passing needs to be only _1_ node. So if I want to pass several, I can wrap them in a `div` or a react fragment `<>`.

```js
rightNode={
    <> 
        <span
            className={s.measureInDetailBoardRightNodeLabel}
        >
            Selected measure:
        </span>
        <Selector
            optionsArray={measureOptions}
            value={`${selectedMeasure}`}
            handleSelectorChange={changeSelectedMeasure}
        />
    </>
}
```

## Passing props forward

### Forwarding all props (except the ones I'm intercepting) to another component

See [example](./../../code_examples/2019Q4/1015TUI-SpinnerButton/README.md).

1. Pass them to another component/element inside my component using `{...props}` (or `{...rest}`, if I'm not passing all of them, because I've intercepted some for example)

2. If I want to intercept some of the props, and only pass the rest, I need to destructure the ones I want separately, then gather the rest of them in them array, and then spread the array as props.
   
   Maybe I should have done this in 2019Q41014-Disclosure, but in any case it's needed for more complex cases.
   Here's how the TenonUI Disclosure component does this:

   Notice how every prop that needs intercepting, and their value modified (as opposed to passed in directly) is destructured separately.

* Note: I don't need to declare the type of additional, unknown props

```tsx
type Props = {
  isBusy: boolean;
  onClick: (e: React.MouseEvent) => void;
  onBusyClick?: (e: React.MouseEvent) => void;
  busyAnnouncement?: string;
  completeAnnouncement?: string;
  replacementClassNames?: ReplacementClassNames;
  children: React.ReactNode;
};

export const SpinnerButton: React.FunctionComponent<Props> = ({
  isBusy,
  onClick,
  onBusyClick,
  busyAnnouncement = "App busy",
  completeAnnouncement = "Action complete",
  replacementClassNames,
  children,
  ...rest /* <= */
}) => {

  // ...

  const handleClick = isBusy ? onBusyClick : onClick;

  return (
    <>
      <div
        className="!visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="additions"
      >
        {liveAnnouncement}
      </div>

      <button
        className={
          (replacementClassNames && replacementClassNames.forButton) ||
          "SpinnerButton"
        }
        onClick={handleClick}
        {...rest} /* <= */
      >
        {children}

        {isSpinning && (
          <Spinner
            title=""
            replacementClassName={
              (replacementClassNames && replacementClassNames.forSpinner) ||
              "SpinnerButton__spinner"
            }
          />
        )}
      </button>
    </>
  );
};
```

#### Passing a `className` prop to a react component, for it to be passed to the underlying DOM element

If props are passed to an underlying DOM element, authors can pass in a `className` prop to a react component, in the knowledge that it'll get transfered to a DOM element:

```tsx
  <Disclosure>
    <DisclosureTrigger className='Disclosure__trigger-button'>Expand / Collapse</DisclosureTrigger>

    <DisclosureTarget>
        <p>Lots of content of content of content of content of content of content of content of content of content of content</p>
    </DisclosureTarget>
  </Disclosure>
```

#### Passing a `replacementClassNames` prop to a react component, to override its default className (and hence styling)

See [example](./../../code_examples/2019Q4/1015TUI-SpinnerButton/README.md).

```tsx
type ReplacementClassNames = {
  forButton: string;
  forSpinner: string;
};

type Props = {
  ...
  replacementClassNames?: ReplacementClassNames;
  ...
};

export const SpinnerButton: React.FunctionComponent<Props> = ({
  ...
  replacementClassNames,
  ...
  ...rest
}) => {
  ...

  return (
    <>
      <button
        className={
          (replacementClassNames && replacementClassNames.forButton) ||
          "SpinnerButton"
        }
        onClick={handleClick}
        {...rest}
      >
        {children}

        {isSpinning && (
          <Spinner
            title=""
            replacementClassName={
              (replacementClassNames && replacementClassNames.forSpinner) ||
              "SpinnerButton__spinner"
            }
          />
        )}
      </button>
    </>
  );
};
```

## Flexible props

### Using props.children either as a ReactNode or a function, depending on its type, in a type-safe way

See [example](./../../code_examples/2019Q4/1015TUI-Disclosure/README.md).

1. The type of `props.children` is an union of
   * React.ReactNode
   * the signature of the fuction I expect. (Don't forget to wrap this one into addiotional brackets to that the `|` doesn't get interpreted as part of the functions' return type)

2. Where I'd normally just render `props.children` if the component was just accepting that, test `typeof props.children === 'function'` as part of a ternary operator:
  * if props.children is a function, render `props.children()`. But TypeScript doesn't automatically infer that `props.children` is a function, so I need to assert its type by using additional brackets before calling it
  * else, render `props.children`

```jsx
import React from 'react';
import { DisclosureContext } from './DisclosureContext';

type Props = {
  children: ((expanded: boolean) => React.ReactNode) | React.ReactNode /* 1 */
  [k: string]: unknown
}

export const DisclosureTrigger: React.FunctionComponent<Props> = (props) => {

  return (
    <DisclosureContext.Consumer>
      {
        ({ expanded, toggleDisclosureVisibility }) => (
          <button
          type='button'
          onClick={toggleDisclosureVisibility}
          aria-expanded={expanded}
          {... props}
          >
            { // Note: This way DisclosureTrigger accepts both some react content, or a function that returns some react content
              typeof props.children === 'function' ?
                (props.children as Function)(expanded) // 2. TSC didn't automatically infer that props.children was a function
                : props.children
            }
          </button>
        )
      }
    </DisclosureContext.Consumer>
  );
}
```

This allows authors to use the component in a flexible way like this:

```tsx
      <div>
        <Disclosure>
          <DisclosureTrigger className='Disclosure__trigger-button'>Expand / Collapse</DisclosureTrigger>

          <DisclosureTarget>
              <p>Lots of content of content of content of content of content of content of content of content of content of content</p>
          </DisclosureTarget>
        </Disclosure>
      </div>

      <div>
        <Disclosure>
          <DisclosureTrigger>{expanded => expanded ? 'collapse' : 'expand'}</DisclosureTrigger>

          <DisclosureTarget>
              <p>Lots of marketing bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</p>
          </DisclosureTarget>
        </Disclosure>
      </div>
```
 