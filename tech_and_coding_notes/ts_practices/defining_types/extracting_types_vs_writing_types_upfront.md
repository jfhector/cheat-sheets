# Extracting types vs writing types upfront

When to declare types inferred from pre-written data objects, and when to declare types written from scratch

### Approach 1: Extracting a type definition from a data object using `typeof` or `keyof typeof`

Most of the time, I'd start by creating a data object in the `data` folder, and then declaring any types that components or functions throughout the app will need to use this data, just above the data (or in a separate types file).

I follow 3 steps:
1. Create a data object I need, in a file in the `data` folder
2. How will this piece of data get used by components and functions throughout the app?
3. What type(s) are needed?
4. Define and export the type either above the component or the data

#### Eg1 `Actions` type declaration, extracted using `typeof` on an object already on `App#actions`..

1. Create the data object

`actions` data object declared in `App.tsx`:

```js
class App extends React.Component<Props, AppState> {

	...

    // ACTIONS

    actions = {
        updateView: () => {
            this.setState(
                (prevState: AppState) => ({
                    displayedFilters: prevState.selectedFilters,
                    dataViewNeedsUpdating: false,
                })
            )
        },
        conditionallySetMeasureInDetailBoardHeaderVisibleStateBasedOnScrollY: () => {
            this.setState({
                  measureInDetailBoardHeaderVisible: (
                    (this.refToMeasureInDetailBoardHeaderContainingDiv.getBoundingClientRect() as DOMRect).top > 0
                  ) ? false : true,
            })
        },
        changeSelected: {
            duration: (newlySelectedDuration: DurationOption) => {
                this.setState(
                    (prevState: AppState) => ({
                        ...prevState,
                        selectedFilters: {
                            ...prevState.selectedFilters,
                            duration: newlySelectedDuration,
                            comparison: Object.keys(comparisonOptionsFor(newlySelectedDuration))[0]
                        },
                        dataViewNeedsUpdating: true,
                    } as AppState)
                )
            },
            dates: (newlySelectedDates: DateOption) => {
                this.setState(
                    (prevState: AppState) => ({
                        selectedFilters: {
                            ...prevState.selectedFilters,
                            dates: newlySelectedDates
                        },
                        dataViewNeedsUpdating: true,
                    } as AppState)
                )
            },
            comparison: (newlySelectedComparison: ComparisonOption) => {
                this.setState(
                    (prevState: AppState) => ({
                        selectedFilters: {
                            ...prevState.selectedFilters,
                            comparison: newlySelectedComparison,
                        },
                        dataViewNeedsUpdating: true,
                    } as AppState)
                )
            },
            
            ...
```

2. How will this piece of data get used by components and functions throughout the app?

a. the `actions` object gets passed down to Organisms via props ..

3. What type(s) are needed?

a. .. so I need a `Actions` type to validate each prop

4. Declare the `Actions` type right above the component that is affected by the actions (or in a shared types file).

```js
// ACTIONS

export type Actions = typeof App.prototype.actions
```

#### Eg2 Selector options type declaration, extrated using `keyof typeof` on a data object already created

1. I create the data object I need

```
export const durationOptions = {
    '4 weeks': undefined,
    '12 weeks': undefined,
    '26 weeks': undefined,
    '52 weeks': undefined
}
```

Note: I created `durationOptions` as an object, although I don't need the keys' values and although the `select` html element that will display the options needs an array, not an object, because:
- Writing an object, even with unused values, allows me to write the data first and extract the type from it – rather than needing to rewrite the same data again in the type definition.
- I can get an array from object keys using `Object.keys(..)`

2. How will this piece of data get used by components and functions throughout the app?

a. The `changeSelected.duration` action takes a duration option as an argument ...

b. The `select` html element that will display the duration options needs an array of all the duration options.
I can extract an array of keys from the object above.

3. What type(s) will be needed?

a. ... will need a type for a valid `DurationOption` to validate its argument

4 Declare and export these types above the data

```js
// DURATION OPTIONS

export type DurationOption = keyof typeof durationOptions
```

#### Eg4 Types for dynamic selector options (i.e. what options to display isn't as simple as reading a static object, but depends on another piece of state, so we need a dataGetter function)

1. Create a static data object I need, in a file in the `data` folder

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

2. How will this piece of data get used by components and functions throughout the app?

a. These options will be displayed by a `select` html element, so a `select` element will need to receive an array of these options. I can create an array of the object's keys using `Object.keys(..)`.

b. Users will select 1 option, and an action will get the corresponding string as an argument and should put that string on the `state` object

c. Which comparison objects shoud be presented by the `select` element depends on what `duration` is currently selected (state), so I need a dataGetter function, which takes a DurationOption as an argument and returns one of the 4 ComparisonOptionsObject above.

3. What type(s) are needed?

a. I might need a type to validate a valid comparison duration array (or object, before an array is extracted from it), or maybe not, depending how the data is passed to the `select` element (i.e. directly from a connected component, which will get the data from `appState`, or through intermediary props?).

b. .. the action object will need a `ComparisonOption` type to validate that the string they receive corresponds to a valid comparison option.

c. I need a type to validate the return value of the function, probably an union type `ComparisonOptionsObject` union of the type of the four data comparison objects.

4 Declare the type(s)

a. nothing for now

b. 

```js
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

c. 

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
```

#### Eg5 Things like a category hierarchy, eg `MedicineSubcategoryName`

Most of the time, I'd start by creating a data object in the `data` folder, and __then declaring any types that components or functions throughout the app will need to use this data__.

1. Create a data object I need, in a file in the `data` folder

```js
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

4. Declare the type(s)

```js
export type MedicineSubcategoryOption = keyof typeof categoryHierarchy['MEDICINE']
```

Note: notice how I've extracted a type from a subobject of the categoryHierarchy I've defined. I could do this at the level of all subcategories, and below that, which I'd probably do if I had a more complex hierarchy system.

### Approach 2: Writing a type definition for the data first, and then the data

When I need a type that will be used on several different objects throughout the app – without one being the canonical version – just as a way to specify an interface.

```js
export const dataForAllMeasuresBasedOnAppState0 = {
    ['Sales value']: {
        value: 'R$5.823.489.124',
        valueChange: '-R$488.843',
        percentChange: '-7,7%',
        changedUpwards: false,
    },
    ['Spend per customer']: {
        value: 'R$3,41',
        valueChange: '-R$1.21',
        percentChange: '-2,1%',
        changedUpwards: false,
    },
    ['Customers']: {
        value: '1.712.897',
        valueChange: '-359.429',
        percentChange: '-5,8%',
        changedUpwards: false,
    },
```

I need a type / interface so when the value, valueChange, percentChange and changedUpwards of a specific measure for components that use it.

```js
export type MeasureData = {
      value: string
      valueChange: string
      percentChange: string
      changedUpwards: boolean
}
```

##### When I write types from strach, then use it on data objects, I might need to create more complex types on top of the basic type I wrote, to type more complex objects.

The `kpisDataForAllMeasuresFor(appState)` function needs a return type to validate an object containing MeasureData for all MeasureOption.

```js
export function kpisDataForAllMeasuresFor(appState: AppState): KpisDataForAllMeasures {
```

So I write it from scratch from `MeasureData` and `MeasureOption` like this:

```js
export type KpisDataForAllMeasures = {[K in MeasureOption]: MeasureData}
```

TODO: Milk this pattern