# Selectors

(What I call) a selector function gives me a piece of state derived from one or several other piece(s) of state.

## Deriving data from props and state using any custom logic

I can use some logic to change props based on state.

It doesn't have to be just 'pass a piece of state into this prop'. I can also have functions that, given an piece of state (argument), return different values for a prop – using whatever custom logic I want.

For example, here the selected duration changes the data options available (i.e. different data options apply for different durations), and also changes the comparison options available (i.e. different comparison options apply for different durations).

I can write 2 functions that take the duration state as arguments, and return values for date options and comparison options based on it.

```js
export function datesOptionsFor(selectedDuration: DurationOption): DateOptionsObject {
    switch (selectedDuration) {
        case '4 weeks': 
            return dateOptionsFor4WeekDuration
        case '12 weeks': 
            return dateOptionsFor12WeekDuration
        case '26 weeks': 
            return dateOptionsFor26WeekDuration
        case '52 weeks': 
            return dateOptionsFor52WeekDuration
        default:
            const _exhaustiveCheck: never = selectedDuration
            return _exhaustiveCheck
    }
}

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

Then, I can call these functions to pass the right value to the selector prop, dynamically based on state:

```js
<Selector
    optionsArray={Object.keys(datesOptionsFor(appState.selectedFilters.duration))}
    value={appState.selectedFilters.dates}
    handleSelectorChange={actions.changeSelected.dates}
/>

...
	
<Selector
    optionsArray={Object.keys(comparisonOptionsFor(appState.selectedFilters.duration))}
    value={appState.selectedFilters.comparison}
    handleSelectorChange={actions.changeSelected.comparison}
/>
```

![](./_assets/dynamicFilterDependencies.png)

## Example of selectors

### Eg 1

```js
import { SelectOption, CoffeeBrandValue, TeaBrandValue } from "../data"

export function brandSellsInCategoryId(
    brand: SelectOption<CoffeeBrandValue | TeaBrandValue>, 
    categoryId: string
): boolean {

    switch (brand.value) {
        case 'Jacobs':
            switch (categoryId) {
                case 'Coffee':
                case 'Instant coffee':
                case 'Decaf coffee':
                    return true
                default:
                    return false
            }

        case 'Nescafé':
            switch (categoryId) {
                case 'Coffee':
                case 'Ground coffee':
                case 'Decaf coffee':
                case 'Instant coffee':
                    return true
                default:
                    return false
            }

        case 'Carte Noire':
        case 'Douwe Egberts':
        case 'Folgers':
        case 'Illy':
        case 'Kenco':
        case 'Lavazza':
        case 'Maxwell House':
        case 'Moccona':
        case 'Mount Hagen':
        case 'Starbucks':
        case 'Tasters Choice':
    
            switch (categoryId) {
                case 'Coffee':
                case 'Ground coffee':
                case 'Decaf coffee':
                case 'Instant coffee':
            
                    return true
                default:
            
                    return false
            }

        case 'Clipper tea':
        case 'Lipton':
        case 'PG Tips':
        case 'Typhoo':
        case 'Twinings':
            switch (categoryId) {
                case 'Tea':
                case 'Instant tea':
                case 'Green tea':
                case 'Black tea':
                    return true
                default:
                    return false
            }

        default:
    
            return false
    }
}
```

### Eg 2:

```js
import { BasketItem } from "../sharedTypes"

export const numberOfItemsInBasket = (basket: Array<BasketItem>): number => {

    let result = 0

    basket.forEach(
        basketItem => {
            result += basketItem.quantity
        }
    )

    return result
}
```

### Eg 3:

```js
import { BasketItem } from "../sharedTypes"

export const totalPrice = (basket: Array<BasketItem>): number => {

    let result = 0

    basket.forEach(
        basketItem => {
            result += basketItem.highLevelProductInfo.price.actual * basketItem.quantity
        }
    )

    return result
}
```


