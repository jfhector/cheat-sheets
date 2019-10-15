# React Portals

## Lessons

### Using React Portals

See [example](./../../code_examples/2019Q4/1024-Modal_React_Component/README.md).

1. create a `div` to serve as the portal target (all the modal elements will be rendered inside it)

```tsx
const $portalTarget = document.createElement('div');
```

2. when the component has mounted, append that portal target to `document.body`
3. when the component is about to dismount, remove the portal target from `document.body`
4. rather than returning a `ReactNode` from the component, render a call to `ReactDOM.createPortal(ReactNode, targetElement)`

```tsx
return ReactDOM.createPortal(
 <>
   <div className='Modal__backdrop'></div>
   
   <div
   ref={modalContentContainerRef}
   className="Modal__content_container"
   tabIndex={-1}
   role='dialog'
   aria-modal={true}
   id={idOfModalContentContainer}
   >
     {children}
   </div>
 </>,
 $portalTarget
);
```