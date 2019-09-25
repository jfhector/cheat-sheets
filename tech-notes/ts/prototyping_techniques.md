# TS prototyping techniques

## Typing state and argument constraints

### Using usions of string litterals in generic types

```js
    actions = {
        select: {
            brand: (newlySelectedBrand: SelectOption<'Jacobs' | 'Nescafé' | 'Lipton'>) => {

            },
```