# JSX

### Variables can be used as JSX tags

When instanciating React components or DOM elements in JSX, the name of the component or tag can be a variable assigned to confidionally, provided that the first character of the variable is upper case:

```jsx
  render() {
    ...
    const Element = this.props.useDialog ? 'dialog' : 'div' /* <= */

    return ReactDOM.createPortal(
      ...

        <Element /* <= */
          role={this.props.role}
          className={classNames.element}
          aria-labelledby={titleId}
        >
          <div
            role={this.props.useDialog ? undefined : 'document'}
            className={classNames.document}
          >
            <button
              type="button"
              aria-label={this.props.closeButtonLabel}
              onClick={this.close}
              className={classNames.closeButton}
            >
              {this.props.closeButtonContent}
            </button>

            <h1 id={titleId} className={classNames.title}>
              {this.props.title}
            </h1>

            {this.props.children}
          </div>
        </Element>

      ...,

      document.querySelector(this.props.dialogRoot)
    )
  }
```