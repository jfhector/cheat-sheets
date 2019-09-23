# 0923rjs-render_prop

[See the CodeSandbox](https://codesandbox.io/s/competent-chatterjee-xbe0n?fontsize=14)

## Notes

### What is the render prop pattern

A component that uses the 'render prop pattern':
1. Take (via its 'render', 'children' or any other prop) a function that takes data and renders a ReactNode
2. Provides the data that the function needs through its state (maybe from listening for mousemove events)
3. Calls that function, with that data, as part of its render

```js
 <MouseTracker>
   {(x: number | undefined, y: number | undefined) => (
     <p>
       The current mouse position is ({x}, {y}).
     </p>
   )}
 </MouseTracker>
```

```js
type MouseTrackerProps = {
  children: (x: number | undefined, y: number | undefined) => React.ReactNode;
};

...

class MouseTracker extends React.Component<MouseTrackerProps, MouseTrackerState> {
    ...

    render () {
       return (
         <div style={{ height: "100%" }} onMouseMove={this.handleMouseMove}>
           <h1>Mouse around!</h1>

           {this.props.children(this.state.x, this.state.y)}
         </div>
       );
    }
```

### How to start extracting the render logic of a component

To extract the render logic of a component, I can start by defining a function inside the component that takes some of its state and renders what I want. Then call that function inside render.

```js
  render() {
    const renderMousePosition = (
      x: number | undefined,
      y: number | undefined
    ) => (
      <p>
        The current mouse position is ({x}, {y}).
      </p>
    );

    return (
      <div style={{ height: "100%" }} onMouseMove={this.handleMouseMove}>
        <h1>Mouse around!</h1>

        {{renderMousePosition(this.state.x, this.state.y)}}
      </div>
    );
  }
}
```

Then, I can extract that function so it is defined outside this component, and provided as a prop.