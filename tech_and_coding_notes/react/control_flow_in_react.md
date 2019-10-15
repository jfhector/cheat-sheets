# Control flow in React

## Alternatives to using IIFEs in render `return` clauses

In the past I've sometimes used IIFEs in the `return` clause of React's render functions.

### When I want to use `switch`

Here I could have used the `&&` or `?` syntaxes, which give JS expressions.

```js
<BottomFixedDiv>
    {(function() {
        switch (true) {
            case remainingMopedVolume(context.state.basket) < 0:
                return (
                    <>
                        <p>
                            You are over your space limit by {-remainingMopedVolume(context.state.basket)}%
                        </p>

                        <Spacer
                            direction='vertical'
                            amount={6}
                        />
                    </>
                )

            case remainingMopedVolume(context.state.basket) <= 25:
                return (
                    <>
                        <p>
                            Remaining space on your moped {remainingMopedVolume(context.state.basket)}%
                        </p>

                        <Spacer
                            direction='vertical'
                            amount={6}
                        />                                            
                    </>
                )
            
            default:
                return null
        }
    })()}
```

### When I want to calculate an intermediary variable

It's much better to do that before returning the render function.


```js
interface SSubCategoriesProps {
    categoryName: string
}
class SSubCategories extends Component<SSubCategoriesProps, {}> {
    render() {
        const { props } = this

        const selectedCategory = categories.filter( category => category.name === props.categoryName )[0] as CategoryWithChildren                           // !! Filter returns an array

        return (
```

