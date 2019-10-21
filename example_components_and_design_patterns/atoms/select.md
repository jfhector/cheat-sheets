# Select

## Summary

Both WTF Forms' and Scott Ohara's implementations are good on the surface, and work in a similar way. I could re-use my WTF component as is. But if I have time it'd be good to implement Scott's and get into the details to see exactly what it adds.

## Master implementation

Scott O'Hara's

## Important considerations

In this bad example, a `<select>` list is used for navigation purposes. The page changes as soon as the user chooses one of the options in the list. Unfortunately, keyboard users on Windows machines may find it difficult to choose the correct option because if they use the down arrow key, the change event will be triggered as soon as the first item is selected, even if that is not the option the user wants.

Note 1: Using alt + down arrow is a workaround for this problem, but not all users are aware of that keyboard combination.

Note 1: Browsers on macOS do not have this problem, because the down arrow key expands the entire list, allowing users to go through the options without selecting them.

### Example

The `<select>` list on this page is coded to jump to the selected page immediately, which causes a problem when using the on Windows browsers: the script activates immediately (and potentially prematurely) when using the down or up arrow keys to try to navigate through the list of items. Using alt + down/up arrow can avoid this problem, but users may not know that they have to use that keyboard combination.

Bad [example](https://dequeuniversity.com/assets/html/module-forms/context/bad/change/history.html).

## From: 1011WTFF-Checkbox_Radio_Select_Progress

See [example](./../../code_examples/2019Q4/1011WTFF-Checkbox_Radio_Select_Progress/README.md).

### Using it

```ts
export type Language_Option = 'French' | 'German' | 'English' | 'Spanish' | 'Georgian' | 'Swiss';
export const language_options: Language_Option[] = ['German', 'French', 'English', 'Spanish', 'Georgian', 'Swiss'];
```

```tsx
const [selectedLanguage, setLanguage] = useState<Language_Option | undefined>();

const handleSelectedLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const selectedValue = e.target.value;
  if (language_options.includes(selectedValue as Language_Option)) {
    setLanguage(selectedValue as Language_Option);
  }
  // TODO: Is there a clearer and safer way of doing this?
};
```

### Defining it

```tsx
type Props = {
  options: string[]
  value: string | undefined
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  id: string
  optionSelectedByDefault?: string
  inline?: boolean
}

export const Select: React.FC<Props> = ({
  options,
  value,
  onChange,
  id,
  inline = false,
}) => {

  return (
    <div className={classNames('Select', {'Select--inline': inline})}>
      <select id={id} value={value} onChange={onChange}>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}
```

```scss
.Select {
  position: relative;

  &:after {
    position: absolute;
    top: 50%;
    right: 1.25rem;
    margin-top: -0.15rem;
    // display: inline-block; // It's already the case, at least in Chrome
    content: '';
    width: 0;
    height: 0;
    pointer-events: none;
    border: 0.35rem solid transparent;
    border-top-color: black;
  }

  select {
    display: inline-block;
    width: 100%;
    margin: 0;
    padding: 0.5rem 2.25rem 0.5rem 1rem;
    background-color: #eee;
    border: 0;
    border-radius: 0.25rem;
    cursor: pointer;
    outline: 0;
    appearance: none;

    &:hover {
      background-color: #ddd;
    }

    &:focus {
      box-shadow:
        0 0 0 0.075rem #fff,
        0 0 0 0.2rem #0074d9;

      &:-moz-focusring { /* Undo the Firefox inner focus ring */
        color: transparent;
        text-shadow: 0 0 0 #000;
      }
    }

    &:active {
      color: #fff;
      background-color: #0074d9;
    }

    &::-ms-expand { /* Hide the arrow in IE10 and up */
      display: none;
    }
  }
}

.Select--inline {
  display: inline-block;
}
```

## To see: From Scott O'Hara

https://scottaohara.github.io/a11y_styled_form_controls/src/select/