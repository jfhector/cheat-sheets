# Classes in JavaScript

## Patterns

### Adding a class on a static property of another class, to import them together

```jsx
<Disclosure>
    <Disclosure.Trigger>Expand/collapse</Disclosure.Trigger>
    <Disclosure.Target>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum
        </p>
    </Disclosure.Target>
</Disclosure>
```

```jsx
import React, { Component } from 'react';
import Target from './Target';
import Trigger from './Trigger';

export class Disclosure extends Component {
  ...

  static Trigger = Trigger;
  static Target = Target;

```
}
