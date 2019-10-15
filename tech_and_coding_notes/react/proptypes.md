# React propTypes

## Patterns

### Accepting either a boolean, or 'true' or 'false'

```jsx
Target.propTypes = {
    useHidden: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(['true', 'false'])
    ]),
    deactivate: PropTypes.bool
};
```