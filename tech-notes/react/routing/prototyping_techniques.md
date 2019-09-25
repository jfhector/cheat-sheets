# Routing prototyping techniques with React

## Creating a basic router for prototyping. (what I did for the Tesco Now prototype)

### 1. Create a basic rooter, i.e. display a piece of state that's a component

### 2. Create actions for changing the component in the piece of state


```
class App extends Component<{}, AppState> {

    state = {
        screen: <SOnboarding1 />,
        // screen: <SCategories />,
        // screen: <SProductList />,
        // screen: <SProductDetails productName='Tesco Steak And Ale Puff Pie 200G' />,
        basket: [] as Array<BasketItem>,
    }

    actions = {
        navigateTo: (
            nextScreen: React.ReactNode,
            targetScrollY: number = 0
        ) => {
            this.setState({
                screen: nextScreen
            })

            window.scrollTo({
                top: targetScrollY
            })
        },

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

        removeFromBasket: (highLevelInfoOfProductToRemove: HighLevelProductInfo) => {
            
            // Updating quantity in basket
            let updatedBasket = this.state.basket.map(
                basketItem => {

                    if (basketItem.highLevelProductInfo.title === highLevelInfoOfProductToRemove.title) {
                        basketItem.quantity -= 1
                        return basketItem

                    } else {
                        return basketItem
                    }

                }
            )

            // Removing items with 0 quantity
            updatedBasket = updatedBasket.filter(
                basketItem => basketItem.quantity > 0
            )

            this.setState({
                basket: updatedBasket
            })
        }
    }

    render() {
        return (
            <Context.Provider
                value={{
                    state: this.state,
                    actions: this.actions,
                }}
            >
                {this.state.screen}
            </Context.Provider>
        )
    }
}
export default App

```

### 3. When want to navigate somewhere, pass in what component to navigate to, as well as the props the component needs to display

```
class SOnboarding1 extends Component<{}, {}> {
    render() {
        return (
            <Context.Consumer>
                {context => (

                    <>
                        <div>
                            <img
                                src={require('./assets/onboarding1.png')}
                                height={300}
                            />
                        </div>

                        <div>
                            Get up to 20 items delivered within 60 minutes
                        </div>

                        <div>
                            <button
                                onClick={() => context.actions.navigateTo(<SOnboarding2 />)}
                            >
                                Next
                            </button>       
                        </div>
                    </>

                )}
            </Context.Consumer>
        )
    }
}
```

### For going back:

#### Any component I might go back from needs to have a `comingFrom` React.ReactNode prop

Eg1

```
interface SProductListProps {
    comingFrom: React.ReactNode
    leafCategoryName: string
}
class SProductList extends Component<SProductListProps, {}> {
    render() {
        const { props } = this

        let leafCategoryProducts: Array<HighLevelProductInfo>                                                                                // Would this work as a computer property if I used an IIFE?
        switch (props.leafCategoryName) {
            case 'Pizza and Garlic Breads':
                leafCategoryProducts = pizzaAndGarlicBreads.data.buylist.productItems
                break

            case 'World Ready Meals':
                leafCategoryProducts = worldReadyMeals.data.buylist.productItems
                break
            
            case 'Fresh Vegetables':
                leafCategoryProducts = freshVegetables.data.buylist.productItems
                break
            
            case 'Cheese':
                leafCategoryProducts = cheese.data.buylist.productItems
                break

            case 'Red Wine':
                leafCategoryProducts = redWine.data.buylist.productItems
                break

            case 'Tissues, Toilet Roll & Kitchen Roll':
                leafCategoryProducts = tissuesToiletRoll.data.buylist.productItems
                break

            default:
                leafCategoryProducts = []                                                                                                       // Will this cause a BUG?
        }

        return (
            <Context.Consumer>
                {context => (

                    <>
                        <TopFixedDiv>
                            <Spacer
                                direction='vertical'
                                amount={6}
                            />

                            <a
                                onClick={() => {context.actions.navigateTo(props.comingFrom)}}
                            >
                                Back
                            </a>

                            <Spacer
                                direction='horizontal'
                                amount={30}
                            />
                            
                            <span>
                                {props.leafCategoryName}
                            </span>

                            <Spacer
                                direction='vertical'
                                amount={6}
                            />                            
                        </TopFixedDiv>

                        <Spacer 
                            direction='vertical'
                            amount={50}
                        />

                        {
                            leafCategoryProducts.map(
                                (highLevelProductInfo: HighLevelProductInfo) => (
                                    <div
                                        className='card card--interactive'
                                        key={highLevelProductInfo.id}
                                        onClick={() => {context.actions.navigateTo(
                                            <SProductDetails 
                                                highLevelProductInfo={highLevelProductInfo}
                                                comingFrom={<SProductList {...props} />}
                                            />
                                        )}}
                                    >
                                        <div>
                                            <img 
                                                src={highLevelProductInfo.defaultImageUrl}
                                                height={80}
                                            />
                                        </div>

                                        <div>
                                            {highLevelProductInfo.title}
                                        </div>

                                        <div>
                                            {`£${highLevelProductInfo.price.actual.toFixed(2)}`}
                                        </div>

                                        {/* <div>
                                            {`£${highLevelProductInfo.price.unitPrice.toFixed(2)}/${highLevelProductInfo.price.unitOfMeasure}`}
                                        </div> */}

                                        <ProductStepper 
                                            highLevelProductInfo={highLevelProductInfo}
                                        />
                                    </div>                                    
                                )
                            )
                        }

                        <Spacer 
                            direction='vertical'
                            amount={80}
                        />                           

                        {Object.keys(context.state.basket).length > 0 &&
                            <BasketBar
                                screenItsPositionedOnIncludingProps={<SProductList {...props} />}
                            />
                        }
                    </>

                )}
            </Context.Consumer>
        )
    }
}
```

Eg2

```
{
    categories.map(
        (category: CategoryWithChildren | CategoryWithoutChildren) => (
            <div
                className='card card--interactive'
                key={category.name}
                onClick={() => {
                        if (category.children[0] == undefined) {
                            context.actions.navigateTo(
                                <SProductList 
                                    comingFrom={<SCategories {...props} />}
                                    leafCategoryName={category.name}
                                />
                            )

                        } else {
                            context.actions.navigateTo(
                                <SSubCategories
                                    categoryName={category.name}
                                />
                            )                                                
                        }
                    }
                }
            >
                <img
                    src={category.images.url}
                    width={100}
                />
                
                <p>{category.name}</p>
            </div>
        )
    )
}
```

#### Then, I go to the value of that prop:

```

interface SProductDetailsProps {
    highLevelProductInfo: HighLevelProductInfo
    comingFrom: React.ReactNode
}
class SProductDetails extends Component<SProductDetailsProps, {}>{
    render() {
        const { props } = this

        return (
            <Context.Consumer>
                {(context) => (

                    <>
                        <TopFixedDiv>
                            <Spacer
                                direction='vertical'
                                amount={6}
                            />

                            <a
                                onClick={() => {context.actions.navigateTo(props.comingFrom)}}
                            >
                                Back
                            </a>

                            <Spacer
                                direction='horizontal'
                                amount={30}
                            />
                            
                            <span>
                                Product details
                            </span>

                            <Spacer
                                direction='vertical'
                                amount={6}
                            />                            
                        </TopFixedDiv>

                        <Spacer 
                            direction='vertical'
                            amount={50}
                        />

                        <div>
                            <img
                                src={props.highLevelProductInfo.defaultImageUrl}
                                width={200}
                            />
                        </div>

                        <div>
                            {props.highLevelProductInfo.title}
                        </div>

                        <div>
                            {`£${props.highLevelProductInfo.price.actual.toFixed(2)}`}
                        </div>

                        <div>
                            {`£${props.highLevelProductInfo.price.unitPrice.toFixed(2)}/${props.highLevelProductInfo.price.unitOfMeasure}`}
                        </div>

                        <ProductStepper 
                            highLevelProductInfo={props.highLevelProductInfo}
                        />

                        <div>
                            <hr />
                        </div>

                        <div>
                            Product information
                        </div>     

                        <div>
                            Description
                        </div>

                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed condimentum metus. Curabitur mauris nunc, tristique vel lacus in, placerat viverra enim.
                        </div>

                        <div>
                            Allergen info    
                        </div>

                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed condimentum metus. Curabitur mauris nunc, tristique vel lacus in, placerat viverra enim.
                        </div>

                        <div>
                            Cooking instructions    
                        </div>

                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed condimentum metus. Curabitur mauris nunc, tristique vel lacus in, placerat viverra enim.
                        </div>

                        <div>
                            Freezing instructions    
                        </div>

                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed condimentum metus. Curabitur mauris nunc, tristique vel lacus in, placerat viverra enim.
                        </div>

                        <div>
                            Ingredients    
                        </div>

                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed condimentum metus. Curabitur mauris nunc, tristique vel lacus in, placerat viverra enim.
                        </div>
                        
                        <Spacer 
                            direction='vertical'
                            amount={80}
                        />    

                        {Object.keys(context.state.basket).length > 0 &&
                            <BasketBar 
                                screenItsPositionedOnIncludingProps={<SProductDetails {...props}/>}
                            />
                        }
                    </>

                )}
            </Context.Consumer>
        )
    }
}

```

#### To pass in that prop, I need to pass in the current component with all its exact props. I do it like this:

```
{
    categories.map(
        (category: CategoryWithChildren | CategoryWithoutChildren) => (
            <div
                className='card card--interactive'
                key={category.name}
                onClick={() => {
                        if (category.children[0] == undefined) {
                            context.actions.navigateTo(
                                <SProductList 
                                    comingFrom={<SCategories {...props} />}
                                    leafCategoryName={category.name}
                                />
                            )

                        } else {
                            context.actions.navigateTo(
                                <SSubCategories
                                    categoryName={category.name}
                                />
                            )                                                
                        }
                    }
                }
            >
                <img
                    src={category.images.url}
                    width={100}
                />
                
                <p>{category.name}</p>
            </div>
        )
    )
}
```

#### Here's how this works for a modal: on the component that triggers the modal, I record what screen it's positioned on, so that the component knows what 'comingFrom' prop it needs to pass to any component it navigates to

```

interface BasketBarProps {
    screenItsPositionedOnIncludingProps: React.ReactNode
}
class BasketBar extends Component<BasketBarProps, {}> {
    render() {
        const { props } = this

        return (
            <Context.Consumer>
                {(context) => (

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

                        <button
                            onClick={(event) => {
                                context.actions.navigateTo(
                                    <SBasket 
                                        comingFrom={props.screenItsPositionedOnIncludingProps}
                                    />
                                )
                                event.stopPropagation()
                            }}
                        >
                            Basket
                        </button>

                        <span>
                            {numberOfItemsInBasket(context.state.basket)} items
                        </span>

                        <Spacer
                            direction='horizontal'
                            amount={80}
                        />

                        <span>
                            {`£${totalPrice(context.state.basket).toFixed(2)}`}
                        </span>
                    </BottomFixedDiv>            

                )}
            </Context.Consumer>
        )
    }
}
```

Using the BasketBar component which triggers a modal:

```
{Object.keys(context.state.basket).length > 0 &&
    <BasketBar 
        screenItsPositionedOnIncludingProps={<SSubCategories {...props} />}
    />
}
```
