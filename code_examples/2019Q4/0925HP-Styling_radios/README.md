# 0925HP-Styling_radios

[See the CodeSandbox](https://codesandbox.io/s/exciting-tharp-3fn0p?fontsize=14)

## What does it demonstrate?

* Styling radio buttons, in an accessible way

## Notes

### When I want to DRY styles, instead of using an abstract parent class, I can just do this

```css
.checkbox, .radio { /* put styles to re-use here */ } 
.checkbox { /* ... */ } 
.radio { /* ... */ }
```

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