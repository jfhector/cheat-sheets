# Arrays

## Array data manipulation

### Using the spread operator to work with an array (which is a reference type) without mutating it

I did this, and it worked on the surface. I imagine that it works as intended

```
addToBasket: (highLevelInfoOfProductToAdd: HighLevelProductInfo) => {

    if (numberOfItemsInBasket(this.state.basket) === 20) {
        window.alert("You've reached your 20-item limit")

        return
    }

    let copyOfBasket = [...this.state.basket]

    let basketItemCorrespondingToProductToAddIfAny = copyOfBasket.find(
        basketItem => basketItem.highLevelProductInfo.title === highLevelInfoOfProductToAdd.title
    )

    if (basketItemCorrespondingToProductToAddIfAny) {
        basketItemCorrespondingToProductToAddIfAny.quantity += 1
    } else {
        copyOfBasket = copyOfBasket.concat({
            highLevelProductInfo: highLevelInfoOfProductToAdd,
            quantity: 1,
        })
    }

    this.setState({
        basket: copyOfBasket
    })
},
```

### Using filter, Set and the spread operator to go from an array of product data, to an array of product categories in the data

In [Thinking in React](./../../code_examples/2019Q4/0921RJS-thinking_in_react/README.md) wanted to go from this:

```js
export const productData = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

... to this:

```js
["Sporting Goods", "Electronics"]
```

The best way to do it was to use filter to get a duplicated array of category names, then to use the spread operator on a new Set to get a de-duplicated array.

```js
const duplicatedCategories = productData.map(productDataItem => productDataItem.category);
const productCategories = [...new Set(duplicatedCategories)];
```
### Array.prototype.filter vs Array.prototype.find

#### Array.prototype.filter returns an array, not an element

This means I can't use / act on the element directly. I need to access it with the scrubcript syntax first (e.g. `[0]`)

```
const selectedCategory = categories.filter( category => category.name === props.categoryName )[0] as CategoryWithChildren                           // !! Filter returns an array
```

#### Array.prototype.find returns the first matching element

I can use it / act on it directly

```
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
```

## Using arrays to render stuff

### Using array#map to not repeat myself

```
<div
   className={s.KpiTilesContainer}
>
	Object.keys(measureOptions).map((measureOption: MeasureOption) => 
		<KpiTile
	        measure={measureOption}
	        kpisData={kpisDataForAllMeasuresFor(appState)[measureOption]}
	        selected={appState.selectedMeasure === measureOption}
	        handleKpiTileClick={actions.changeSelected.measure}
	        key={measureOption}
	    />
	)
</div>
```


