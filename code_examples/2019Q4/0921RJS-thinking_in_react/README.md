# 0921RJS-thinking_in_react

## Notes

### Using filter, Set and the spread operator to go from an array of product data, to an array of product categories in the data

I wanted to go from this:

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
