# Typing props flexibly

## Using props.children either as a ReactNode or a function, depending on its type, in a type-safe way

See [example](./../../../code_examples/2019Q4/1015TUI-Disclosure/README.md).

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
 