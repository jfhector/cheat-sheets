# Objects

## Object keys

### Using string litterals as keys in object litterals

I can use any string litteral as key for an object directly, when creating an object litteral: `{'any litteral string': 64}`

Eg 1
```
const myObj = {
	'Sales value': 421,
	'Sales units': 784,
}
```

Eg 2
```
export const storeFormatOptions = {
    'All store formats': undefined,
    'Express stores': undefined,
    'Metro stores': undefined,
    'Extra stores': undefined,
    'Online': undefined
}
```

### Using variables that evaluate to strings as keys in object litterals

If I'm using computed strings (i.e. variables/const that evaluate to a string), rather than string litterals, as keys for the object I'm declaring, I need to use the computed keys syntax `{[myComputedKey]: 64}`

Eg 1

```
const myObj = {
	[computedKeyOfTypeString]: 64,
	[otherComputedKeyOfTypeString]: 64,
}
```

Eg 2

```
<button
    className={classNames(
        'Button',
        typeOption,
        sizeOption,
        {
            [s.fullWidth]: fullWidth,
            [s.disabled]: disabled,
        }
    )}
    onClick={() => {}}
>
    {children}
</button>
```