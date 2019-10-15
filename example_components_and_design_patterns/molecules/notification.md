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