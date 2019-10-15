# Array TS practices

## Type safety on arrays, by defining the type of valid array options first

To get decent type safety on an array of options, I can first define a type for a valid array option, then say that the variable containing the array is an array of element of that type.

```ts
export type Language_Option = 'French' | 'German' | 'English' | 'Spanish' | 'Georgian' | 'Swiss';
export const language_options: Language_Option[] = ['German', 'French', 'English', 'Spanish', 'Georgian', 'Swiss'];
```

Is there another way to do this?