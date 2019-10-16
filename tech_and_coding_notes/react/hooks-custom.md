# React Custom Hooks

## Getting previous values (props, state, etc)

See React Docs in Hooks FAQ

## Elimitating boilerplate for a controlled input element

Defining the hook:

```jsx
const useInput = () => {
  const inputId = React.createRef(generateUniqueId());
  const [inputValue, setInputValue] = React.useState('');  
    
  onChangeHandler = e => {
      setInputValue(e.target.value)
  }
  
  return {
      id: inputId,
      value: inputValue
      onChange: onChangeHandler
  }
}
```

Using the hook:

```jsx
const inputProps = useInput();

return (
  <>
    <label htmlFor={inputProps.id}>Your pet's name</label>
    <input {...inputProps} />
  </>    
);
```