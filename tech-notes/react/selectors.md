# Selectors

(What I call) a selector function gives me a piece of state derived from one or several other piece(s) of state.

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


