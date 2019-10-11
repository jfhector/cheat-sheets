# Progress

## From: 1011WTFF-Checkbox_Radio_Select_Progress

See [example](./../../code_examples/2019Q4/1011WTFF-Checkbox_Radio_Select_Progress/README.md).

### Using it

```tsx
<Progress value={75}/>

<Progress value={100}/>
```

### Defining it

```tsx
type Props = {
  value: number,
  max?: number,
}

export const Progress: React.FC<Props> = ({
  value,
  max = 100
}) => {

  return (
    <progress className='Progress' value={value} max={max}>{value}</progress>
  );
}
```

```scss
.Progress {
  width: 100%; /* The width is automatically set by the browser to a value that is not 100% */
  display: inline-block;
  height: 1rem;
  appearance: none;

  &::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 0.2rem;
  }

  &::-webkit-progress-value {
    background-color: #0074d9;
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
  }

  &[value='100']::-webkit-progress-value {
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }

  /* Firefox styles */
  background-color: #eee;
  border-radius: 0.2rem;
  border: 0; /* Remove Firefox and Opera border */

  &::-moz-progress-bar {
    background-color: #0074d9;
    border-top-left-radius: .2rem;
    border-bottom-left-radius: .2rem;
  }

  &[value='100']::-moz-progress-bar {
    border-top-right-radius: .2rem;
    border-bottom-right-radius: .2rem;
  }

  /* IE styles */
  /* IE10 uses `color` to set the bar background-color */
  color: #0074d9;
}
```