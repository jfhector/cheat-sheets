# Checkbox

## From: 1011WTFF-Checkbox_Radio_Select_Progress

See [example](./../../code_examples/2019Q4/1011WTFF-Checkbox_Radio_Select_Progress/README.md).

### Consuming the Checkbox:

```tsx
const [checkboxChecked, setCheckboxChecked] = useState(false);
const handleCheckboxChange = () => { setCheckboxChecked(!checkboxChecked); };

...

<Checkbox checked={checkboxChecked} onChange={handleCheckboxChange}>
  Loud
</Checkbox>
```

### Defining the Checkbox:

```ts
type Props = {
    children: string,
    checked: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    readonly?: boolean
    disabled?: boolean
    inline?: boolean
}

export const Checkbox: React.FC<Props> = ({
    children,
    checked,
    onChange,
    readonly = false, 
    disabled = false,
    inline = false,
}) => {
    return (
        <label className={classNames('Checkbox', {'Checkbox--inline': inline})}>
            <input type="checkbox" 
            checked={checked}
            onChange={onChange}
            disabled={disabled}/>

            <span className="control-indicator" />

            {children}
        </label>
    );
}
```

```scss
@import './../shared_form_styles.scss';

.Checkbox {
    @extend .control;
}

.Checkbox--inline {
    display: inline-block;
}

.control-indicator {
    .Checkbox > & {
        border-radius: 0.25rem;
    }

    .Checkbox > input:checked ~ & {
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNCwxTDUuNywxLjdMMi45LDQuNUwyLjEsMy43TDEuNCwzTDAsNC40bDAuNywwLjdsMS41LDEuNWwwLjcsMC43bDAuNy0wLjdsMy41LTMuNWwwLjctMC43TDYuNCwxTDYuNCwxeiINCgkvPg0KPC9zdmc+DQo=);
    }
}
```

shared_form_styles.css:

```scss
.control {
    position: relative;
    padding-left: 1.5rem;
    display: block;
    cursor: pointer;
}

.control--inline {
    display: inline-block;
}

.control > input {
    position: absolute;
    z-index: -1;
    opacity: 0;
}

.control-indicator {
    position: absolute;
    top: 0.15rem;
    left: 0;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    // font-size: 65%;
    // color: #eee;
    // text-align: center;
    background-color: #eee;
    background-size: 50% 50%;
    background-position: center center;
    background-repeat: no-repeat;

    // States
    .control:hover > & {
        color: #fff;
        background-color: #ccc;
    }

    .control > input:focus ~ & {
        box-shadow:
            0 0 0 0.075rem #fff,
            0 0 0 0.2rem #0074d9;
    }

    .control > input:checked ~ & {
        color: #fff;
        background-color: #0074d9;
    }

    .control > input:active ~ & {
        color: #fff;
        background-color: #84c6ff;
    }
}
```