# Notification

## Summary

A div that receives content and is added the right accessibility semantics, simple.

TenonUI's implementation looks good.

## Master implementation: TenonUI

### Defining the component: 

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ children, isActive, type }) => (
    <div
        role={type === 'error' ? 'alert' : 'status'}
        aria-live={type === 'error' ? 'assertive' : 'polite'}
        aria-atomic="true"
        className="notification"
    >
        {isActive ? <div className={type}>{children}</div> : null}
    </div>
);

Notification.propTypes = {
    isActive: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['error', 'warning', 'success', 'info']).isRequired
};

export default Notification;
```

### Using the component: 

```jsx
import React, { Component, Fragment } from 'react';
import { Notification } from '@tenon-io/tenon-ui';

class NotificationExample extends Component {
    state = {
        showInfoMessage: false
    };

    onClickHandler = () => {
        this.setState({ showInfoMessage: true });
    };

    onDismissHandler = () => {
        this.setState({ showInfoMessage: false });
    };

    render() {
        return (
            <Fragment>
                <Notification isActive={this.state.showInfoMessage} type="info">
                    <span>This is an information message</span>
                    <button
                        type="button"
                        className="dismiss-button"
                        onClick={this.onDismissHandler}
                    >
                        Dismiss
                    </button>
                </Notification>
                <button onClick={this.onClickHandler}>
                    Show information message
                </button>
            </Fragment>
        );
    }
}

export default NotificationExample;
```

## Other examples

* Heydon Pickering has one in Inclusive Components, chapter that I haven't yet documented.

## Learning notes

### The ARIA live region MUST be recognized by the accessibility API before text can be injected into it.

The best practice is to include an empty live region container in the document on page load. That is the safest way to ensure that the accessibility API registers the container as a live region.

It is possible to add a live region to the DOM later, as long as the region is empty when it is added. **If the region is added to the DOM without a page refresh event, insert a delay with JavaScript before attempting to inject any announcement into it.** You'll need to experiment with the duration of the pause. 

Test on a variety of screen readers and browsers, including mobile devices, before deciding on a minimum delay duration. **Chances are that at least 2 seconds will be required across all combinations, but other factors may come into play.**

Deque WAS course November 2019

### Screen readers do not inform users of alerts that are present on the page before load completes

It is important to note that, at this time, screen readers do not inform users of alerts that are present on the page before page load completes.