
# The classnames module

## Using the `className` dependency to facilitate applying CSS rulesets conditionally

`'classnames'` is a simple JavaScript utility for conditionally joining classNames together.

Eg

```js
classNames('foo', 'bar'); 					// => 'foo bar'
classNames('foo', { bar: true }); 		// => 'foo bar'
classNames({ 'foo-bar': true }); 			// => 'foo-bar'
classNames({ 'foo-bar': false }); 		// => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); 	// => 'foo bar'
```

Essentially:
- Any string I give it as an argument, gets added to the string that I assign to `className`
- I can use a string as an object key, with an associated boolean value. At runtime, if that value is true, the strings gets added, but not if it's false.

This allows me to very easy apply, or not apply, CSS classes based on a boolean value that I got frop props or state.

Eg

```js
<button
    className={classNames(
        'Button',
        styles[props.typeOption],
        styles[props.sizeOption],
        {
            'fullWidth': props.fullWidth,
            'disabled': props.disabled,
        }
    )}
    onClick={!disabled ? handleButtonClick : (() => { console.log('Button was clicked but is disabled') })}
>
    {children}
</button>
```

## Example: Using the classNames(..) function to dynamically, conditionally construct strings for the `className` tag

```
className(
	'Button',
			// always adds the 'Button' class name to the returned string
	styles[props.typeOption!],
	styles[props.sizeOption!],
			// always adds the typeOption and sizeOption strings (passed through props) to the returned string
	{
		'fullWidth': props.fullWidth,
	   	'disabled': props.disabled,
			// adds the 'fullWidth' and 'disabled' string only if the fullWidth and disabled bools evaluate to true   	
	}	
)
```

## Usage notes

### If using computed strings (i.e. variables/const that evaluate as strings) as object keys for conditionally applying CSS classes, remember to use the computed key object creation syntax: {[myComputedKeyOfTypeString]: value}

```
<button
    className={classNames(
        styles.Button,
        styles[props.typeOption!],
        styles[props.sizeOption!],
        {
            [styles.fullWidth]: props.fullWidth,
            [styles.disabled]: props.disabled,
        }
    )}
    onClick={!disabled ? handleButtonClick : (() => { console.log('Button was clicked but is disabled') })}
>
    {children}
</button>
```