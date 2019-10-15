# Inline SVG

## Examples

```js
plusSvg = (
    <svg
        height='12px'
        width='12px'
    >
        <rect y='5px' height='2px' width='100%' fill='#ffffff'/>
        <rect x='5px' width='2px' height='100%' fill='#ffffff'/>
    </svg>
)

minusSvg = (
    <svg
        height='12px'
        width='12px'
    >
        <rect y='5px' height='2px' width='100%' fill='#ffffff'/>
    </svg>
)

render() {
    const { props } = this

    return (
        <div
            className={styles.CollapseButton}
            onClick={props.handleClick}
        >
            {props.expanded ? this.minusSvg : this.plusSvg}
        </div>
    )
}
```