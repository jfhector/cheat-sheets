# Interpreting errors

### Cannot invoke an expression whose type lacks a call signature. has no compatible call signatures

This simply means that I'm calling something that's not a function. (or maybe, calling the value of a property that I expect to be a function, but which doesn't exist on the object I'm calling it on, eg children.map() if children is of type never[]). When I call map on something, the type of that thing must be clear and unambiguous and certain that it has children on the right type, always

```js
selectedCategory.children.map(                                                     
    (subcategory: SubCategory) => (
        <div
            className='card card--interactive'
            key={subcategory.name}
            onClick={() => context.actions.navigateTo(
                <SProductList 
                    comingFrom={<SSubCategories {...props} />}
                    leafCategoryName={subcategory.name}
                />
            )}
        >
            <Spacer 
                direction='vertical'
                amount={6}
            />

            <p>{subcategory.name}</p>

            <Spacer 
                direction='vertical'
                amount={6}
            />
        </div>  
    )
)
```js