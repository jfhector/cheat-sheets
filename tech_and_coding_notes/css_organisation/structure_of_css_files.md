
# Structure of CSS files

All the CSS files in my prototypes follow the same structure:

## Base style comes first, and uses the same name as the component

```
.Button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-size: medium;
    cursor: pointer;
    width: max-content;
}
```

## Conditionally applied rulesets are organised under markers for clarity.

### a `/* ... BOOL PROP */` marker is followed by _any/all ruleset(s) that gets applied based on that boolean prop_.

__Every ruleset that conditionally apply based on that bool prop should be placed after this marker.__


Eg 1

```
/* fullWidth BOOL PROP */

.fullWidth {
    width: 100%;
}
```

Eg 2

```
/* visible BOOL PROP */

.Alert:not(.visible) {
    height: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    margin-bottom: 0;
    border-width: 0;
    font-size: 0;
}

.visible > button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 12px 20px;
    background-color: transparent;
    border: initial;
    line-height: 1;
    font-size: x-large;
    font-weight: bold;
    color: inherit;
    opacity: 0.5;
    cursor: pointer;
}
```

### a `/* ...Option */` marker means that one of the following rules will apply, based on a prop that's of type union of magical strings

```
/* typeOption */

.primary {
    background-color: var(--backgroundColor_button_primary);
    color: white;
}

.secondary {
    background-color: var(--backgroundColor_button_secondary);
    color: white;
}

.success {
    background-color: var(--backgroundColor_button_success);
    color: white;
}

.danger {
    background-color: var(--backgroundColor_button_danger);
    color: white;
}

.warning {
    background-color: var(--backgroundColor_button_warning);
    color: white;
}

.info {
    background-color: var(--backgroundColor_button_info);
    color: white;
}

.light {
    background-color: var(--backgroundColor_button_light);
    color: white;
}

.dark {
    background-color: var(--backgroundColor_button_dark);
    color: white;
}

/* sizeOption */

.small {
    padding: 4px 8px;
    line-height: 21px;
}

.medium {
    padding: 6px 12px;
    line-height: 24px;
}

.large {
    padding: 8px 16px;
    line-height: 30px;
}
```

## !! Important note: when different CSS rulesets give conflicting assignment to the same property, the order that matters is the order in which they appear in the `.css` file, not the order of the class names into the `className` tag. !!

Eg:

Let's take the example of a component were different rulesets set `background-color` to different values:
- the `typeOption` string values (i.e. `primary`, `secondary`, `warning`, etc) set `background-color` to different values
- the `disabled` ruleset set `background-color` to grey

### In Button.tsx:

Notice how the `disabled` class name will appear last in the list of class names passed into the `className` tag.

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

### In Button.css, version 1 (incorrect):

Because `disabled` appears last in the string passed into the `classname` string, I'd be forgiven to believe that the `.disabled {}` ruleset will be applied last, and hence have the last word.

However that's not the case, that's not how it workstyles.

With the order below, the button's `background-color` will never be grey, even when `disabled` is true.

```
/* bool */

.disabled {
    background-color: var(--backgroundColor_button_disabled);
}

/* typeOption */

.primary {
    background-color: var(--backgroundColor_button_primary);
    color: white;
}

.secondary {
    background-color: var(--backgroundColor_button_secondary);
    color: white;
}

.success {
    background-color: var(--backgroundColor_button_success);
    color: white;
}

...

```

### In Button.css, version 2 (correct): 

In fact, it's the order in which the ruleset appear in the `.css` file (not the order in which the different classnames appear in the string assigned to `className`) that determines which ruleset with conflicting property assignment will have the last word.

Rulesets that appear latest in the `.css` file have the last word over rulesets that appear previously in the file. Where the name of the class sits in the string passed into the `className` tag doesn't matter.

So this is the correct implementation if I want `.disabled{ .. }`'s `background-color` to trump the instructions from the button type option rulesetstyles.

```
/* typeOption */

.primary {
    background-color: var(--backgroundColor_button_primary);
    color: white;
}

.secondary {
    background-color: var(--backgroundColor_button_secondary);
    color: white;
}

.success {
    background-color: var(--backgroundColor_button_success);
    color: white;
}

.danger {
    background-color: var(--backgroundColor_button_danger);
    color: white;
}

.warning {
    background-color: var(--backgroundColor_button_warning);
    color: white;
}

.info {
    background-color: var(--backgroundColor_button_info);
    color: white;
}

.light {
    background-color: var(--backgroundColor_button_light);
    color: white;
}

.dark {
    background-color: var(--backgroundColor_button_dark);
    color: white;
}

/* bool */

.disabled {
    background-color: var(--backgroundColor_button_disabled);
}
```

