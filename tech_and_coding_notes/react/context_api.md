# React context API

Using the Context API to avoid passing too many props through too many components

## Use case 1: Using the React Context API to share state and/or actions between a ancestor component and one or more of its descendant components

See [example](./../../code_examples/2019Q4/1015TUI-Disclosure/README.md).


1. import `React.createContext` and instanciate a context object in a separate file, so that I can import it across different components.
   
   `createContext` takes a generic type parameter corresponding to the type of the context value.

<figure>
  <figcaption>An example file structure, with the context instance being defined in a separate module:</figcaption>
  <img src="./_assets/content_instance_in_separate_module.png">
</figure>

```ts
import { createContext} from 'react';

type ContextValue = {
  expanded: boolean
  toggleDisclosureVisibility: () => void
}

export const DisclosureContext = createContext<ContextValue>({
  expanded: false,
  toggleDisclosureVisibility: () => {},
});
```

2. Define a component that will embed the context provider, providing the value passed through as context, and that the context consumers will be a descendant of.
   
  * To the `value` prop of the context provider, I need to pass the value that will be made available via the context consumer. Typically that `value` is a piece of state defined on that component, but we might want to also pass functions to update that state as part of the `value`.

```tsx
import React, { useState } from 'react';
import { DisclosureContext } from './DisclosureContext';

type Props = {
  expandedByDefault?: boolean
  children: React.ReactNode
}

export const Disclosure: React.FunctionComponent<Props> = ({
  expandedByDefault = false,
  children
}) => {

  const [expanded, setExpanded] = useState(expandedByDefault);

  function toggleDisclosureVisibility() {
    setExpanded(prevState => !prevState);
  };

  return (
    <DisclosureContext.Provider value={{ expanded, toggleDisclosureVisibility }}>
      {children}
    </DisclosureContext.Provider>
  );
};

export { DisclosureTrigger } from './DisclosureTrigger';
export { DisclosureTarget } from './DisclosureTarget';
```

3. Embed the context consumer in the descendant components that need access to the context value. The context consumer children are a render prop, so a function that takes in the context value, and return a ReactNode.

```jsx
export const DisclosureTrigger: React.FunctionComponent<Props> = (props) => {

  return (
    <DisclosureContext.Consumer>
      {
        ({ expanded, toggleDisclosureVisibility }) => (
          <button
          type='button'
          onClick={toggleDisclosureVisibility}
          aria-expanded={expanded}
          {... props}
          >
            { // Note: This way DisclosureTrigger accepts both some react content, or a function that returns some react content
              typeof props.children === 'function' ?
                (props.children as Function)(expanded) // TSC didn't automatically infer that props.children was a function
                : props.children
            }
          </button>
        )
      }
    </DisclosureContext.Consumer>
  );
}
```


## Use case 2: Avoid passing too many props to a custom component

Eg. Sidebar and DataViewComponent get lots of props, and it's a component that's custom for this prototype.
In this case, I could use the context API to give them access to all the state and actions it needs.

### From this:

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

