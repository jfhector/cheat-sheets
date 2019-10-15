# Refs

## Ref forwarding

### Adding ref forwarding support to a component. So parent components using it can get a ref to the underlying DOM element and access it if necessary — just like if they used a DOM button directly.

```js
export const FancyTextInput = React.forwardRef<HTMLInputElement, Props>(
  function fancyTextInput(props, ref) {
    return (
      <input
        type="text"
        className={props.color === "purple" ? "FancyTextInput--purple" : "FancyTextInput--pink"}
        ref={ref}
      />
    );
  }
);
```

* React.forwardRef is a generic type.
  * The first type is the type of the element that will be given the ref (eg. HTMLInputElement, or MyComponent)
  * The second type is the type of the props

* Alternatively to what I did above, I could create a 'RefForFancyTextInput' type and export it for when the ref is created. But after trying that, it's had no benefits. Instead ...
  * here I specify the type of the element that will receive the ref ('HTMLInputElement')
  * and when the ref object is created, I specify the corresponding type ('React.RefObject<HTMLInputElement>')
    TypeScript will flag any differences.
    This is a simplified version of this https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315

* A named function (like `fancyTextInput` here) appears named in React Devtools.
An anonymous function would just be labelled as 'forwardRef'.

See [code example](./../../code_examples/2019Q4/0923rjs-forwarding-refs/README.md).

### When a component has been set up with `React.forwardRef`, I can pass it a ref, that will be passed to the underlying DOM element

```js
class TextInputWithFocusButton extends React.Component<{}, {}> {
  // I'm going to pass down this ref to the child component 'FancyTextInput',
  // so that it can be assigned a text input inside that child component
  refForTextInputInsideFancyTextInputComponent: React.RefObject<HTMLInputElement> = React.createRef();

  ...

  render() {
    return (
      <>
        <FancyTextInput ref={this.refForTextInputInsideFancyTextInputComponent} color="pink" />

        <button type="button" onClick={this.focusInput}>
          Focus text input
        </button>
      </>
    );
  }
```

See [code example](./../../code_examples/2019Q4/0923rjs-forwarding-refs/README.md).


## Using callbacks to assign refs

### Where ref assignment functions are defined and stored

__A ref assignment function is declared on the same component as the ref, 
so that the function definition can capture the ref variable by closure__.

... In the past I've defined these functions on a `refAssignmentFunctions` property of the component:

Eg1

```js
// Refs

refToMeasureInDetailBoardHeaderContainingDiv: HTMLDivElement

refAssignmentFunctions = {
    refAssignmentFunctionforRefToMeasureInDetailBoardHeaderContainingDiv: (element: HTMLDivElement) => {
        this.refToMeasureInDetailBoardHeaderContainingDiv = element
    }
}
```

#### I do this even if I don't need to pass the ref assignment function as a prop, just for sake of simplicity and consistency

```js
// REFS

refToMeasureInDetailBoardHeaderContainingDiv: HTMLDivElement

refToViewTitleInput: HTMLInputElement

refAssignmentFunctions = {
    forMeasureInDetailBoardHeaderContainingDiv: (element: HTMLDivElement) => {
        this.refToMeasureInDetailBoardHeaderContainingDiv = element
    },

    forViewTitleInput: (element: HTMLInputElement) => {
        this.refToViewTitleInput = element
    },
}
```

Using the ref assignment function:

```js
    <input
        ref={this.refAssignmentFunctions.forViewTitleInput}
        className={classNames(
            s.input,
            {
                [s.inputHoldsDefaultValue]: this.state.viewTitle === INITIAL_VIEW_TITLE,
                [s.input_savedViewDoesNotReflectCurrentFilters]: !_.isEqual(this.state.previouslySavedFilters, this.state.selectedFilters),
            }
        )}
        type='text'
        value={this.state.viewTitle}
        onChange={this.actions.updateViewTitle}
    />
```

****### Passing down ref assignment functions (which, because they are defined on the same component as the ref, capture the property on which the ref will be stored)

__Don't transport refs. Only pass down ref assignment functions from the component on which the ref it is defined, to the instance of the component that needs can make the assignment, by passing down `refAssignmentFunctions` as a prop.__

Then call the relevant ref assigment function where within the component instance where the right assignment can be made. Using closure, the function will assign the reference to the designated key on the object stores on the refs property of the `App` instance

#### Example:

1. Get _only the correct_ ref assignment function passed down as a prop. 
(Or all of them if it's easier for me, if the component is an Organism rather than a Molecule or an Atom).

```
<CollapsibleMeasureInDetailBoard
    headerIsSticky
    appState={appState}
    handleCollapseButtonClick={actions.expansionToggles.toggleMeasureInDetailExpanded}
    actions={actions}
    refAssignmentFunctionforRefToMeasureInDetailBoardHeaderContainingDiv={
        refAssignmentFunctions.refAssignmentFunctionforRefToMeasureInDetailBoardHeaderContainingDiv
    }
    isCorrectInstanceForRefToMeasureInDetailBoardHeaderContainingDiv
>
```

On the component receiving the props:
```
interface Props {
    children: React.ReactNode
    headerIsSticky?: boolean
    
    // Connecting the component
    appState: AppState
    actions: Actions
    
    // Instance-specific function extracted from actions upstream
    handleCollapseButtonClick?: React.MouseEventHandler<HTMLDivElement>
    
    // Ref assignment
    refAssignmentFunctionforRefToMeasureInDetailBoardHeaderContainingDiv: (element: HTMLDivElement) => void
    isCorrectInstanceForRefToMeasureInDetailBoardHeaderContainingDiv: boolean
}
```

Note the type of a ref assignment function: `(element: HTMLElement) => Void` or ideally more specialised so I make sure I use the ref in the right way
(eg `(element: HTMLDivElement) => void`)

2. On the html element that I want to reference, pass in the ref assignment function to the `ref` tag

```
<div
    className={s.headerContainer}
    ref={refAssignmentFunctions.refAssignmentFunctionforRefToMeasureInDetailBoardHeaderContainingDiv}
>
```

### Typing the ref assignment function

Note the type of a ref assignment function: `(element: HTMLElement) => Void` or ideally more specialised so I make sure I use the ref in the right way
(eg `(element: HTMLDivElement) => void`)

### When using ref assignment functions, I can assign a ref programatically (not just using `ref={}`). And I can use ref assignment functions to assign JS objects (not just a DOM nodes)

```jsx

class Dialog extends React.Component {
  ...

  componentDidUpdate(prevProps, prevState) {
    if (prevState.container !== this.state.container && this.state.container) {
      this.dialog = this.dialog || this.initDialog()
      this.props.dialogRef(this.dialog) /* <= */
    }
  }

  componentWillUnmount() {
    if (this.dialog) {
      this.dialog.destroy()
    }

    this.props.dialogRef(undefined) /* <= */
  }

  ...
}

Dialog.propTypes = {
  ...
  // A function called when the component has mounted, receiving the instance
  // of A11yDialog so that it can be programmatically accessed later on.
  // E.g.: dialogRef={(dialog) => (this.dialog = dialog)}
  dialogRef: PropTypes.func,
  ...
}
```

See how the function passed as the `dialogRef` prop is used to get a reference to the JS object instance of `a11y-dialog` from inside the `Dialog` component, and assign it to `this.dialog` on the consuming React parent component.

```jsx
  render () {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          Open the dialog
        </button>

        <Dialog id="my-accessible-dialog"
                appRoot="#main"
                dialogRoot="#dialog-root"
                dialogRef={(dialog) => (this.dialog = dialog)}
                title="The dialog title">
          <p>Some content for the dialog.</p>
        </Dialog>
      </div>
    )
  }
```

https://github.com/HugoGiraudel/react-a11y-dialog/blob/master/index.js
