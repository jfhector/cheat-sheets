# Useful TypeScript patterns for defining types

## Using Typescript magic strings to define types

eg
```js
export type DurationOption = 
      '52 weeks' | 
      '26 weeks' | 
      '12 weeks' | 
      '4 weeks'
```

Means that a variable of type `DurationOption` can only have one of these 4 string values.


## Defining types for a category hierarchy

### Theoretical example from TS Deep Dive:

Capturing the type of a variable containing a magic string, using typeof:

```js
const foo = 'hello'

let bar: typeof foo

bar = 'hello' // No problem
bar = 'anything else' // Compilor error
```

Capturing the string names of object keys to create a union type of magic strings:

```js
const colors = {
	red: 'red'
	blue: 'blue'							// Note: It doesn't actually matter what the value associated with these keys are in this example
}

type Color = keyof typeof colors

let color: Color
color = 'red'		// Ok
color = 'blue'	// Ok
color = 'anything else'		// Compilor error
```

### Desired outcomes:
a. I have a type to validate that a string is one of a set of strings that each are a valid selection.
b. A nested object representing a hierarchy of nested categories and subcategories

### Approach: 

1. Create the nested `categoriesHierarchy` objet representing a hierarchy of nested categories and subcategories. Do this in a data file
2. Import the `categoriesHierarchy` object into the sharedTypes file (so that all my shared types are defined in the same file).
3. Get a type representing an union of magical strings of the level-1 keys of that object by using `type level0CategoryName = keyof typeof categoriesHierarchy`
4. Validate newValues for a medicine subcategory using the `level0CategoryName ` type
5. Use the same process to validate names of subcategories. Eg `type MedicineSubcategoryName = keyof typeof categoriesHierarchy['MEDICINE']`
6. If I want a type to validate any subcategory name across several level of hierarchies, I need to repeat the step above to get subcategory names for different categories, then make an union of all these union types. Eg. `type AnySubcategoryName = MedicineSubcategoryName | FoodSubcategoryName | SportSubcategoryName | ...`

Eg

In categoryHierarchy.ts

```js
export const categoryHierarchy = {
    'MEDICINE': {
        'DERMATOLOGY': {
            'DERMATOLOGY SUBCAT 1': {},
            'DERMATOLOGY SUBCAT 2': {},
        },
        'CHOLESTEROL': {},
        'CARDIOTHERAPY': {},
        'ANTICOAGULANT': {},
        'GASTRIC HEALTH': {},
        'WEIGHT CONTROLH': {},
        'INTESTINE HEALTH': {},
        'HYPERTENSION': {}
    }
}
```

In sharedTypes.ts:

```js
export type MedicineSubcategoryName = keyof typeof categoryHierarchy['MEDICINE']
```

## Ensuring exhaustivity in `switch` blocks and `if` blocks

TS allows me to automatically check, at compile time, that my `switch` cases are exhaustive.

### How to do it

1. Define a function like this in a `utils` folder

`export function assertNever(arg: never) { return arg }`

2. When I write a switch block, to ensure that I've handled all the cases before reaching `default`, use the `default:` case to pass in the value I'm interating over to the `assertNever( )` function

```
export const histogramFor = (
    selectedBrand: SelectOption<'Jacobs' | 'Nescafé' | 'Lipton'>,
    selectedCategory: CategoryOption<'Coffee' | 'Instant coffee'>,
    selectedCompetitor: SelectOption<'Lavazza' | 'Maxwell House'>
): string => {

    switch (selectedBrand.value) {
        case 'Jacobs':
        case 'Lipton':
            return svgs.stateDependent.histogram[selectedBrand.value].generic

        case 'Nescafé':
            return svgs.stateDependent.histogram[selectedBrand.value][selectedCategory.id][selectedCompetitor.value]

        default: return assertNever(selectedBrand.value)
    }
}

```

### Why does this work?

The reason this works is that:

- the `never` type in TS represents something that never happens.
Eg a function that never returns has the return type of `never`. 

Eg

```
function neverReturns(): never { throw new Error() }
```

Note: a function with return type `never` (i.e. a function that never returns) is not to be confused with a function of return type `void` (i.e. a function that returns nothing).

- a variable/const of type `never` can only be assigned to another variable/const of type `never`.

- so if my switch cases are _exhaustive_ before the `default` case, the variable/const I'm switching on (eg here `appState.selectedMeasure`), placed in the `default` block, _will not return any assignment value_, so I can assign it to `arg: never`.

- but on the other hand if my switch cases are _not exhaustive before_ the `default` case, the variable/const I'm switching on, placed in the `default` block, _will return a value_, so it can't be assigned to `arg: never` and I get a helpful compile time error.

### Note: If the function expects a return value, I need to return a value, so don't forget to return the result of the call to assertNever( ) (which returns never)

### Note: I can use this pattern with `if () else if () else ()` blocks as well.

I.e. treat the final `else` in the same way I treat `default` above.

Eg:

```
function area(s: Shape) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    else if (s.kind === "circle") {
        return Math.PI * (s.radius **2);
    }
    else {
        const _exhaustiveCheck: never = s;
    }
}
```

## Using generics to easily handle more complex types

1. If I define types that can be one of several string values:

```js
export type CoffeeBrandValue =
    'Carte Noire' |
    'Douwe Egberts' |
    'Folgers' |
    'Illy' |
    'Jacobs' |
    'Kenco' |
    'Lavazza' |
    'Maxwell House' |
    'Moccona' |
    'Mount Hagen' |
    'Nescafé' |
    'Starbucks' |
    'Tasters Choice'

export type TeaBrandValue =
    'Lipton' |
    'PG Tips' |
    'Typhoo' |
    'Twinings'|
    'Clipper tea'

export type MeasureValue =
    'Sales value' |
    'Sales units' |
    'Share of category' |
    'Av. price per unit' |
    '% sold on promotion' |
    'Rate of sale' |
    'Stores selling'
```

2. ... I can then define a Generic type, that takes one of these more granular types (or an union of them) as a parameter:

```js
export type SelectOption<T extends MeasureValue | CoffeeBrandValue | TeaBrandValue> = {
    label: string,
    value: T
}
```

`extends` means that the type I pass as an argument to the `SelectOption<>` type needs to have at least the constraints as `MeasureValue | CoffeeBrandValue | TeaBrandValue`, or more constraints.

3. And then, with this, I can get types for these more complex objects:

And I can say: 'This is a select option, but the value can only be
- eg1: a coffee brand
- eg2: a coffee brand or a tea brand
- eg3: a measure
- eg4: 'Jacobs', 'Nescafé' or 'Lipton' (this works because this set is included in `MeasureValue | CoffeeBrandValue | TeaBrandValue`)
- eg5: 'Coffee' or 'Instant coffee' (this works because this set is included in `MeasureValue | CoffeeBrandValue | TeaBrandValue`)
- eg6: 'Lavazza' or 'Maxwell House' (this works because this set is included in `MeasureValue | CoffeeBrandValue | TeaBrandValue`)

### Eg 1:

```js
export const coffeeBrandOptions: SelectOption<CoffeeBrandValue>[] = [
    {
        label: 'Carte Noire',
        value: 'Carte Noire'
    },
    {
        label: 'Douwe Egberts',
        value: 'Douwe Egberts'
    },    
    {
        label: 'Folgers',
        value: 'Folgers'
    },
    {
        label: 'Illy',
        value: 'Illy'
    },
    {
        label: 'Jacobs',
        value: 'Jacobs',
    },
    {
        label: 'Kenco',
        value: 'Kenco'
    },
    {
        label: 'Lavazza',
        value: 'Lavazza'
    },
    {
        label: 'Maxwell House',
        value: 'Maxwell House'
    },
    {
        label: 'Moccona',
        value: 'Moccona'
    },
    {
        label: 'Mount Hagen',
        value: 'Mount Hagen'
    },
    {
        label: 'Nescafé',
        value: 'Nescafé'
    },
    {
        label: 'Starbucks',
        value: 'Starbucks'
    },
    {
        label: 'Tasters Choice',
        value: 'Tasters Choice'
    },
]
```

### Eg2

```js
export const brandOptions: SelectOption<CoffeeBrandValue | TeaBrandValue>[] = [
    {
        label: 'Carte Noire',
        value: 'Carte Noire'
    },
    {
        label: 'Clipper tea',
        value: 'Clipper tea'
    },
    {
        label: 'Douwe Egberts',
        value: 'Douwe Egberts'
    },    
    {
        label: 'Folgers',
        value: 'Folgers'
    },
    {
        label: 'Illy',
        value: 'Illy'
    },
    {
        label: 'Jacobs',
        value: 'Jacobs',
    },
    {
        label: 'Kenco',
        value: 'Kenco'
    },
    {
        label: 'Lavazza',
        value: 'Lavazza'
    },
    {
        label: 'Lipton',
        value: 'Lipton'
    },
    {
        label: 'Maxwell House',
        value: 'Maxwell House'
    },
    {
        label: 'Moccona',
        value: 'Moccona'
    },
    {
        label: 'Mount Hagen',
        value: 'Mount Hagen'
    },
    {
        label: 'Nescafé',
        value: 'Nescafé'
    },
    {
        label: 'PG Tips',
        value: 'PG Tips'
    },
    {
        label: 'Starbucks',
        value: 'Starbucks'
    },
    {
        label: 'Tasters Choice',
        value: 'Tasters Choice'
    },
    {
        label: 'Typhoo',
        value: 'Typhoo'
    },
    {
        label: 'Twinings',
        value: 'Twinings'
    },
]
```

### Eg3

```js
export const measureOptions: SelectOption<MeasureValue>[] = [
    {
        label: 'Sales value',
        value: 'Sales value',
    },
    {
        label: 'Sales units',
        value: 'Sales units',
    },
    {
        label: 'Share of category',
        value: 'Share of category',
    },
    {
        label: 'Av. price per unit',
        value: 'Av. price per unit',
    },
    {
        label: '% sold on promotion',
        value: '% sold on promotion',
    },
    {
        label: 'Rate of sale',
        value: 'Rate of sale',
    },
    {
        label: 'Stores selling',
        value: 'Stores selling',
    },
]
```

### Eg4, 5, 6:

```js
export const histogramFor = (
    selectedBrand: SelectOption<'Jacobs' | 'Nescafé' | 'Lipton'>,
    selectedCategory: CategoryOption<'Coffee' | 'Instant coffee'>,
    selectedCompetitor: SelectOption<'Lavazza' | 'Maxwell House'>
): string => {

    switch (selectedBrand.value) {
        case 'Jacobs':
        case 'Lipton':
            return svgs.stateDependent.histogram[selectedBrand.value].generic

        case 'Nescafé':
            return svgs.stateDependent.histogram[selectedBrand.value][selectedCategory.id][selectedCompetitor.value]

        default: return assertNever(selectedBrand.value)
    }
}
```


## Allowing extra properties on an object

### Eg

```js
export interface CategoryWithoutChildren {
    name: string
    children: []
    [k: string]: any
}
```

### Eg

```js
var x: { foo: number, [key: string]: any };
x = { foo: 1, baz: 2 };  // Ok, `baz` matched by index signature
```

## See also

[Examples in Where I write type definitions](./where_i_write_type_definitions.md)