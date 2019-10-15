# State

## Where state is stored

State objects are defined, and managed, on the lowest-possible component that is or renders all the components that use or set the state.

This is the same thing that the React docs recommend.

eg

```js
import * as React from 'react'
import * as styles from './CollapsibleContentBoard.css'
import * as classNames from 'classnames'
import { CollapseButton } from '../..';

type Props = {
    title: string
    children: React.ReactNode
    headerIsSticky?: boolean
    rightNode?: React.ReactNode
    initiallyExpanded?: boolean
}

type State = {
    headerHighlighted: boolean,
    expanded: boolean,
}

export class CollapsibleContentBoard extends React.Component<Props, State> {
    static defaultProps = {
        initiallyExpanded: false,
        rightNode: null,
        headerIsSticky: false,
    }

    constructor(props: Props) {
        super(props)
        this.state = {
            headerHighlighted: false,
            expanded: props.initiallyExpanded as boolean
        }
    }

    headerContainerDiv: HTMLDivElement

    actions = {
        toggleExpand: () => {
            this.setState((prevState: State) => ({
                expanded: !prevState.expanded
            }))
        },
        conditionallyHighlightBoardHeadersBasedOnScrollY: () => {
            let headerContainingDivBoundingRect = this.headerContainerDiv.getBoundingClientRect() as DOMRect

            this.setState({
                headerHighlighted: (headerContainingDivBoundingRect.top > -1) ? false : true,
            })
        },
    }

    componentDidMount() {
        window.addEventListener(
            'scroll',
            this.actions.conditionallyHighlightBoardHeadersBasedOnScrollY
        )
    }

    componentWillUnmount() {
        window.removeEventListener(
            'scroll',
            this.actions.conditionallyHighlightBoardHeadersBasedOnScrollY
        )
    }

    render() {
        const { props, state, actions } = this

        return (
            <div
                className={classNames(
                    styles.CollapsibleContentBoard,
                    {
                        [styles.expanded]: state.expanded,
                        [styles.headerIsSticky]: props.headerIsSticky,
                        [styles.headerHighlighted]: state.headerHighlighted
                    }
                )}
            >
                <div
                    className={styles.headerContainer}
                    ref={(element: HTMLDivElement) => { this.headerContainerDiv = element }}
                >
                    <div
                        className={styles.collapseButtonContainer}
                    >
                        <CollapseButton
                            expanded={state.expanded}
                            handleClick={actions.toggleExpand}
                        />
                    </div>

                    <div
                        className={styles.title}
                    >
                        {props.title}
                    </div>

                    <div
                        className={styles.rightNodeContainer}
                    >
                        {props.rightNode}
                    </div>
                </div>
                
                {state.expanded &&
                    <div
                        className={styles.childrenContainer}
                    >
                        {props.children}
                    </div>
                }
            </div>
        )
    }

}
```

## Using nesting within the state object

### Eg

```js
interface Props {
    selected: {
        brand: SelectOption<CoffeeBrandValue | TeaBrandValue>
        category: CategoryOption<'Coffee' | 'Instant coffee'>
        analysisPeriod: keyof typeof analysisPeriodOptions
        comparisonPeriod: keyof typeof comparisonPeriodOptions
        region: keyof typeof regionOptions
        storeFormat: keyof typeof storeFormatOptions
    }
    ...
}
```

## How state gets updated via action handlers

I like this pattern:
1. State only gets updated when action functions get called.
2. All action handler functions are stored in an object stored on the `actions` property of component which holds the state object that needs to be updated.

These action function definitions can be grouped into objects stored on the object stored on the `actions` property of the `App` class.

```js
export class DataSubtitle extends React.Component<Props, {}> {
	
	// STATE
	
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
	    
	    ...
	    
	    selectionChanges: {
	        changeSelectedDuration: (newlySelectedDuration: DurationOption) => {
	            this.setState(
	                (prevState: AppState) => ({
	                    selectedFilters: {
	                        ...prevState.selectedFilters,
	                        duration: newlySelectedDuration,
	                        comparison: getComparisonOptions(newlySelectedDuration)[0]
	                    },
	                    dataViewNeedsUpdating: true,
	                } as AppState)
	            )
	        },
	        changeSelectedDates: (newlySelectedDates: DateOption) => {
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
	        
	        ...
	        
	    },
	    expansionToggles: {
	        toggleMeasuresSummaryExpanded: () => {
	            this.setState(
	                (prevState: AppState) => ({
	                    measuresSummaryExpanded: !prevState.measuresSummaryExpanded,
	                })
	            )
	        },
	        toggleKPITreesExpanded: () => {
	            this.setState(
	                (prevState: AppState) => ({
	                    KPITreesExpanded: !prevState.KPITreesExpanded
	                })
	            )
	        },
	        
			...
	    },
	}
```

## How setState gets called

### Updating a root key of the state object

When updating a root key of the state object, calling setState is done through the standard method, by passing in a function that receives the previousState object as an argument and returns _parts_ of the new state object.

```js
updateView: () => {
    this.setState(
        (prevState: AppState) => ({
            displayedFilters: prevState.selectedFilters,
            dataViewNeedsUpdating: false,
        })
    )
},
```

### Updating part of the nested state object

The function passed into setState always needs to return one or several key/value pairs corresponding to the root keys of the state object.

If I only want to update just a part of one of the value of one of these keys, I use the spread operator to return copy of value of a whole key then make some modifications, so that I can return the whole key/value pair.

```js
changeSelectedComparison: (newlySelectedComparison: ComparisonOption) => {
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
```


## Passing down actions functions via props

The actions are defined on the component whose state are updated, then passed down via props to whatever component instance needs to perform the action.

Eg 

1. Definition of different (but related) actions to be performed by two different instances of the same component

```js
actions: {
	...
	expansionToggles: {
	    toggleMeasuresSummaryExpanded: () => {
	        this.setState(
	            (prevState: AppState) => ({
	                measuresSummaryExpanded: !prevState.measuresSummaryExpanded,
	            })
	        )
	    },
	    toggleKPITreesExpanded: () => {
	        this.setState(
	            (prevState: AppState) => ({
	                KPITreesExpanded: !prevState.KPITreesExpanded
	            })
	        )
	    },
	},
	...
}
```

2. These different actions handlers are passed down via props to two different instances of the same component

```js
<CollapsibleContentBoard
    title='Performance overview'
    expanded={appState.measuresSummaryExpanded}
    handleCollapseButtonClick={actions.expansionToggles.toggleMeasuresSummaryExpanded}
>

...

<CollapsibleContentBoard
    title='KPI tree'
    expanded={appState.KPITreesExpanded}
    handleCollapseButtonClick={actions.expansionToggles.toggleKPITreesExpanded}
>

...

```

3. When passing these action handlers as props, I need to type the props

```js
interface Props {
    selected: {
        brand: SelectOption<CoffeeBrandValue | TeaBrandValue>
        category: CategoryOption<'Coffee' | 'Instant coffee'>
        analysisPeriod: keyof typeof analysisPeriodOptions
        comparisonPeriod: keyof typeof comparisonPeriodOptions
        region: keyof typeof regionOptions
        storeFormat: keyof typeof storeFormatOptions
    }
    handle: {
        select: {
            brand: (newlySelectedBrand: SelectOption<CoffeeBrandValue | TeaBrandValue>) => void,
            category: (newlySelectedCategory: CategoryOption<'Coffee' | 'Instant coffee'>['id']) => void,
            analysisPeriod: (newlySelectedAnalysisPeriod: keyof typeof analysisPeriodOptions) => void,
            comparisonPeriod: (newlySelectedComparisonPeriod: keyof typeof comparisonPeriodOptions) => void,
            region: (newlySelectedRegion: keyof typeof regionOptions) => void,
            storeFormat: (newlySelectedStoreFormat: keyof typeof storeFormatOptions) => void,
        }
    }
}
```


