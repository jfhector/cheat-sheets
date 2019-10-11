# Radio button

## From: 1011WTFF-Checkbox_Radio_Select_Progress

See [example](./../../code_examples/2019Q4/1011WTFF-Checkbox_Radio_Select_Progress/README.md).

### Consuming the radio buttons:

```ts
export const flavour = {
  vanilla: 'Vanilla',
  chocolate: 'Chocolate',
}
```

```tsx
const [flavourRadioChecked, setFlavourRadioChecked] = useState<keyof typeof flavour | undefined>(undefined);
const handleFlavourRadioChange = (e: ChangeEvent<HTMLInputElement>) => { setFlavourRadioChecked(e.target.value as keyof typeof flavour); };

...

<fieldset>
  <legend>Choose your flavour</legend>

  <RadioButton name="flavour" checked={flavourRadioChecked === flavour.vanilla} onChange={handleFlavourRadioChange}>
    {flavour.vanilla}
  </RadioButton>

  <RadioButton name="flavour" checked={flavourRadioChecked === flavour.chocolate} onChange={handleFlavourRadioChange}>
    {flavour.chocolate}
  </RadioButton>
</fieldset>
```

### Defining the Checkbox:

```ts
type Props = {
    children: string,
    name: string,
    checked: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    readonly?: boolean
    disabled?: boolean
    inline?: boolean
}

export const RadioButton: React.FC<Props> = ({
    children,
    name,
    checked,
    onChange,
    readonly = false, 
    disabled = false,
    inline = false,
}) => {

    return (
        <label 
            className={classNames('RadioButton', {'RadioButton--inline': inline})}>
            <input type="radio" 
            name={name}
            value={children}
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

.RadioButton {
  @extend .control;
}

.RadioButton--inline {
  display: inline-block;
}

.control-indicator {
  .RadioButton > & {
      border-radius: 50%;
  }

  .RadioButton > input:checked ~ & {
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTQsMUMyLjMsMSwxLDIuMywxLDRzMS4zLDMsMywzczMtMS4zLDMtM1M1LjcsMSw0LDF6Ii8+DQo8L3N2Zz4NCg==);
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


## From 0925HP-Styling_radios

See [example](./../../code_examples/2019Q4/0925HP-Styling_radios/README.md).

### Different way to style a radio box

```css
.radio,
.checkbox {
  position: absolute;
  height: 1px;
  width: 1px;
  padding: 0px;
  border: none;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

.radio + span::before {
  content: "";
  width: 2rem;
  height: 2rem;
  border: 0.25rem solid white;
  box-shadow: 0 0 0 0.15rem black;
  margin-right: 0.75rem;
  display: inline-block;
  border-radius: 50%;
  vertical-align: -0.65rem;
  transition: all 150ms ease-in-out;
}

.radio:checked + span::before {
  background-color: green;
  box-shadow: 0 0 0 0.2rem black;
}

.radio:focus + span::before {
  box-shadow: 0 0 0 0.15rem black, 0 0 0 0.25rem purple;
}

.radio:checked:focus + span::before {
  box-shadow: 0 0 0 0.2rem black, 0 0 0 0.35 purple;
}
```

## To look at: Scott O'Hara's

[https://scottaohara.github.io/a11y_styled_form_controls/src/checkbox/](https://scottaohara.github.io/a11y_styled_form_controls/src/checkbox/)

## Look at: Adrian Roselli's

[https://adrianroselli.com/2017/05/under-engineered-custom-radio-buttons-and-checkboxen.html](https://adrianroselli.com/2017/05/under-engineered-custom-radio-buttons-and-checkboxen.html)

