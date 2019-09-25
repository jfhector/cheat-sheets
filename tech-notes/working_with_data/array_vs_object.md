# Using array vs using object as a data structure

## Option a: Using an array as the root data object

```js
interface ProductStepperProps {
    highLevelProductInfo: HighLevelProductInfo
}
class ProductStepper extends Component<ProductStepperProps, {}> {
    render() {
        const { props } = this

        return (
            <Context.Consumer>
                {(context) => (

                    <Stepper 
                        count={
                            (function() {
                                let basketItemCorrespondingToProductIfAny = context.state.basket.find(basketItem => basketItem.highLevelProductInfo.title === props.highLevelProductInfo.title)

                                if (basketItemCorrespondingToProductIfAny) {
                                    return basketItemCorrespondingToProductIfAny.quantity
                                } else {
                                    return 0
                                }
                                
                            })()
                        }
                        item={props.highLevelProductInfo}
                        handleAdd={context.actions.addToBasket}
                        handleRemove={context.actions.removeFromBasket}
                    />         

                )}
            </Context.Consumer>
        )
    }
}
```

## Option b: Using an object as the rool data object, even when the most expected type would be an array (preferred)

### Eg1. For static selector options

```js
export const durationOptions = {
    '4 weeks': undefined,
    '12 weeks': undefined,
    '26 weeks': undefined,
    '52 weeks': undefined
}
```

__I created `durationOptions` as an object, although I don't need the keys' values and although the `select` html element that will display the options needs an array, not an object, because__:
- Writing an object, even with unused values, allows me to write the data first and extract the type from it – rather than needing to rewrite the same data again in the type definition.
- I can get an array from object keys using `Object.keys(..)`

### Eg2: This is what typing data props looks like with this method:

See the last four examples, compared to the top 2

```js
type Props = {
    selected: {
        brand: SelectOption<'Jacobs' | 'Nescafé' | 'Lipton'>
        category: CategoryOption<'Coffee' | 'Instant coffee'>
        analysisPeriod: keyof typeof analysisPeriodOptions
        comparisonPeriod: keyof typeof comparisonPeriodOptions
        region: keyof typeof regionOptions
        storeFormat: keyof typeof storeFormatOptions
    },
    loading?: boolean
}
```

The top 2 examples show data stored in custom structures, and typed using a generics (see Typings.md and TS refreshers.md).


### Writing an object, rather than an array, allows me to automatically extract an union type for each of the possible options

This is how I extract the `DurationObject` type out of the object above:

```js
type DurationOption = keyof typeof durationOptions
```

### I can turn an object's keys into an array usin `Object.keys(..)`

```js
<Selector
    optionsArray={Object.keys(durationOptions)}
    value={appState.selectedFilters.duration}
    handleSelectorChange={actions.changeSelected.duration}
/>
```

## This is even more useful for dynamic selector options (i.e. using dataGetters)

```js
export const comparisonOptionsFor4WeekDuration = {
    'vs. previous 4 weeks': undefined,
    'vs. last year': undefined
}

export const comparisonOptionsFor12WeekDuration = {
    'vs. previous 12 weeks': undefined,
    'vs. last year': undefined
}

export const comparisonOptionsFor26WeekDuration = {
    'vs. previous 26 weeks': undefined,
    'vs. last year': undefined
}

export const comparisonOptionsFor52WeekDuration = {
    'vs. previous 52 weeks': undefined,
    'vs. last year': undefined
}
```

I need a type that validate that a string is a valid comparison option, and also a type for the return value of a function that returns one of the objects above:

```js
export function comparisonOptionsFor(selectedDuration: DurationOption): ComparisonOptionsObject {
    switch (selectedDuration) {
        case '52 weeks': 
            return comparisonOptionsFor52WeekDuration
        case '26 weeks': 
            return comparisonOptionsFor26WeekDuration
        case '12 weeks': 
            return comparisonOptionsFor12WeekDuration
        case '4 weeks': 
            return comparisonOptionsFor4WeekDuration
        default:
            const _exhaustiveCheck: never = selectedDuration
            return _exhaustiveCheck
    }
}
```

I can easily extract all this from the data objects I wrote. It'd have been impossible (?) with an Array (Unless I've missed something in TS?):

```js
type ComparisonOptionsObjectFor4WeekDuration = typeof comparisonOptionsFor4WeekDuration
type ComparisonOptionsObjectFor12WeekDuration = typeof comparisonOptionsFor12WeekDuration
type ComparisonOptionsObjectFor26WeekDuration = typeof comparisonOptionsFor26WeekDuration
type ComparisonOptionsObjectFor52WeekDuration = typeof comparisonOptionsFor52WeekDuration
export type ComparisonOptionsObject =
    ComparisonOptionsObjectFor4WeekDuration |
    ComparisonOptionsObjectFor12WeekDuration |
    ComparisonOptionsObjectFor26WeekDuration |
    ComparisonOptionsObjectFor52WeekDuration

type ComparisonOptionFor4WeekDuration = keyof ComparisonOptionsObjectFor4WeekDuration
type ComparisonOptionFor12WeekDuration = keyof ComparisonOptionsObjectFor12WeekDuration
type ComparisonOptionFor26WeekDuration = keyof ComparisonOptionsObjectFor26WeekDuration
type ComparisonOptionFor52WeekDuration = keyof ComparisonOptionsObjectFor52WeekDuration
export type ComparisonOption =
    ComparisonOptionFor4WeekDuration |
    ComparisonOptionFor12WeekDuration |
    ComparisonOptionFor26WeekDuration |
    ComparisonOptionFor52WeekDuration

```

Then, when I need to extract an array of options from the object's keys, I can easily do it as follows:

When passing props into a presentational component:
```js
    <Selector
        optionsArray={Object.keys(comparisonOptionsFor(appState.selectedFilters.duration))}
        value={appState.selectedFilters.comparison}
        handleSelectorChange={actions.changeSelected.comparison}
    />
```









## Representing hierarchical data

Things like a category hierarchy data are easily represented by nested objects, eg `MedicineSubcategoryName`.

1. Create a data object I need, in a file in the `data` folder

```
export const categoryHierarchy = {
    'MEDICINE': {
        'All product groups': {},
        'DERMATOLOGY': {
            'All product groups': {},
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

2. How will this piece of data get used by components and functions throughout the app?

a. A select element will need to display the subcategories of `MEDICINE` as options. It will need this as an array but I can extract the array of the object's keys. Depending on how the select element receives this data, it might or might not need to be passed through props and validated as an object of all the options.

b. As a user selects one of them, an action will receive that selection, to update state with it.

3. What type(s) are needed?

a. No

b. `MedicineSubcategoryOption`

1. Declare the type(s)

```js
export type MedicineSubcategoryOption = keyof typeof categoryHierarchy['MEDICINE']
```