# Focus catcher

https://www.tenon-ui.info/focus-catcher

## Why

Usually the React event system fully respects and follows the way events work in the actual browser DOM.

But with focus and blur this is different. In React, both of these events are bubbled up the tree until they are handled. 

This is a conscious decision, and even makes it possible to sanely implement [alternatives for Focus Outside](https://reactjs.org/docs/accessibility.html#mouse-and-pointer-events).

In accessible applications you want to keep the CSS focus outline intact for all elements that can receive focus. But here this bubbling can cause some unexpected side effects.

The input below sits in a focusable container: a div that has been given tabIndex="-1" because we may want to set focus to it later via code. Click on the label below to see the side effect:

## Solution

Tenon's FocusCatcher react component:

### Component usage

```jsx
import { FocusCatcher } from '@tenon-io/tenon-ui';

//...

<section tabIndex="-1">

//...

    <FocusCatcher>
        <label htmlFor="myId">Click me</label>
        <input type="text" id="myId" />
    </FocusCatcher>

//...

</section>
```

### Component definition

```jsx
import React from 'react';

/**
 * @component
 * The implementation of React differs from the DOM spec in that the
 * focus and blur events are bubbled in the React DOM, while they
 * don't get bubbled in a normal HTML application.
 *
 * The reason for this is to allow acting on these functions on
 * parent container elements, which comes in very handy in a component
 * based application.
 *
 * However, as side-effect, this could mean that clicking one elements
 * could inadvertently focus a parent container that exists to manage
 * keyboard focus. If the focus outline is properly implemented,
 * this can lead to a distracting flash of focus switching. Or that
 * elements unexpectedly gets marked as focused when this is visually
 * unhandy.
 *
 * This component create a barrier that stops the focus event from
 * bubbling higher, thereby isolating the container and allowing
 * both click and keyboard events to behave as expected with regards
 * to the focus outline.
 */
const FocusCatcher = ({ children }) => (
    <div
        tabIndex="-1"
        onFocus={e => {
            e.stopPropagation();
        }}
        style={{ outline: 'none' }}
    >
        {children}
    </div>
);

export default FocusCatcher;
```
