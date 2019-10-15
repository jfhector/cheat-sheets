# React context API

Using the Context API to avoid passing too many props through too many components

## Use case 1: Avoid passing too many props to a custom component

Eg. Sidebar and DataViewComponent get lots of props, and it's a component that's custom for this prototype.
In this case, I could use the context API to give them access to all the state and actions it needs.

From this:

```js
<main
    className={styles.main}
>
    <div
        className={styles.sidebarContainer}
    >
        <div
            className={styles.sidebarStickyContainer}
        >
            <Sidebar 
                selected={{
                    brand: state.selected.brand,
                    category: state.selected.category,
                    analysisPeriod: state.selected.analysisPeriod,
                    comparisonPeriod: state.selected.comparisonPeriod,
                    region: state.selected.region,
                    storeFormat: state.selected.storeFormat,
                }}
                handle={{
                    select: {
                        brand: actions.select.brand,
                        category: actions.select.category,
                        analysisPeriod: actions.select.analysisPeriod,
                        comparisonPeriod: actions.select.comparisonPeriod,
                        region: actions.select.region,
                        storeFormat: actions.select.storeFormat,
                    }
                }}
            />
        </div>
    </div>

    <div
        className={styles.dataViewContainer}
    >
        <DataViewComponent
            selected={{
                brand: state.selected.brand,
                category: state.selected.category,
                analysisPeriod: state.selected.analysisPeriod,
                comparisonPeriod: state.selected.comparisonPeriod,
                region: state.selected.region,
                storeFormat: state.selected.storeFormat,
            }}
            loading={state.loading}
        />
    </div>
</main>   
```

### To this (from a different project):

#### 1 Create a Context component

```js
const Context = React.createContext({
    state: {
        screen: <SOnboarding1/>,
        basket: [] as Array<BasketItem>,
    },
    actions: {
        navigateTo: (nextScreen: React.ReactNode): void => {},
        addToBasket: (highLevelInfoOfProductToAdd: HighLevelProductInfo): void => {},
        removeFromBasket: (highLevelInfoOfProductToRemove: HighLevelProductInfo): void => {}
    }
})
```

#### 2 Establish the context provider

```js
interface AppState {
    screen: React.ReactNode
    basket: Array<BasketItem>
}
class App extends Component<{}, AppState> {

    state = {
        screen: <SOnboarding1 />,
        basket: [] as Array<BasketItem>,
    }

    actions = {
        navigateTo: (
            nextScreen: React.ReactNode,
            targetScrollY: number = 0
        ) => {
				...
        },

        addToBasket: (highLevelInfoOfProductToAdd: HighLevelProductInfo) => {
				...
        },

        removeFromBasket: (highLevelInfoOfProductToRemove: HighLevelProductInfo) => {
            ...
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

#### 3 Establish the context consumer

Eg 1

```js
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


Eg 2

```js
class SCategories extends Component<{}, {}> {
    render() {

        const { props } = this

        return (
            <Context.Consumer>
                {context => (
                    <>
                        <div>
                            <a>
                                Settings
                            </a>
                        </div>

                        <div>
                            Delivering to <a> N1 9BE </a>
                        </div>

                        <div>
                            <label>Search</label>

                            <input
                                type='text'
                                name='search'
                                placeholder='What do you need?'
                            />
                        </div>

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

                        <Spacer 
                            direction='vertical'
                            amount={80}
                        />                        

                        {Object.keys(context.state.basket).length > 0 &&
                            <BasketBar
                                screenItsPositionedOnIncludingProps={<SCategories {...props} />}
                            />
                        }
                    </>
                )}
            </Context.Consumer>
        )
    }
}
```

