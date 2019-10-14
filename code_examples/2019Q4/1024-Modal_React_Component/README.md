# 1024-Modal_React_Component

[See it live](https://oct24modalreactcomponent.now.sh)

1.43 KB (instead of 6kb for react-modal).

## Snapshots

<figure>
  <figcaption>The modal displayed</figcaption>
  <img src="./snapshots/s01.png">
</figure>

## Notes

### Using React Portals

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

### Using `inert`

1. Add the [`inert` polyfill](https://github.com/GoogleChrome/inert-polyfill)
2. Get an array of all the children of `document.body`
3. When a modal has just mounted, set the `inert` attribute on all of them **before** appending the element that will contain the modal to `document.body`
4. When a modal is about to dismount, **after** removing the element that contained the modal from `document.body`, remove the `inert` attribute on all the children of `document.body`

```tsx
  useEffect(() => {
    ...

    const childrenOfBodyElement = Array.from(document.body.children);
    childrenOfBodyElement.forEach(_ => _.setAttribute('inert', ''));
    
    ...

    return function cleanup() {
      document.body.removeChild($portalTarget);
      childrenOfBodyElement.forEach(_ => _.removeAttribute('inert'));

      ...
    }
  }, [$portalTarget]);
```

### Typing React `useRef` hook

`useRef` takes a generic type parameter to indicate the type of the element that will receive the reference

```tsx
const modalContentContainerRef = useRef<HTMLDivElement>(null);
```

### Detecting `click` events outside an element, and using this to dismiss a dialog

This could be in a component that consumes a Modal component:

```tsx
  useEffect(() => {
    // document.addEventListener('keyup', handleEscapeKeyup);
    document.addEventListener('click', handleClickAnywhereOutsideModal);

    function handleClickAnywhereOutsideModal (e: MouseEvent) {
      if (!modalVisible) { return }

      const $modalContainer = document.getElementById(idForModalContainer);
      if (!$modalContainer) { return }
  
      if (!$modalContainer.contains(e.target as HTMLElement)) { /* <= */
        setModalVisible(false);
        e.stopPropagation();
      }
    }

    return function cleanup() {
      // document.removeEventListener('keyup', handleEscapeKeyup);
      document.removeEventListener('click', handleClickAnywhereOutsideModal);
    }
  }, [modalVisible, idForModalContainer]);
```

Note that the component that uses the Modal instance needs to know what `id` will be used, inside the Modal component, on the div containing the modal content. To do this, I define the `id` in the consuming component (so that the `handleClickAnywhereOutsideModal` function has access to it), then pass it that `id` to be used in the Modal component instance.

### Typing a KeyboardEvent in React

```tsx
  function handleEscapeKeyup (e: KeyboardEvent) { /* Notice the type. It's not a React type */
    if (e.key === 'Escape') {
      setModalVisible(false)
      e.stopPropagation();
    }
  }
```

### Typing mouse event handlers in React, depending on whether I'm going to use them with `element.addEventListener` or as an `onClick` prop

It seems like click handlers that will be passed as `onClick` props need to be typed `(e: React.MouseEvent) => void`.

... but it seems like click handlers that will be used in `element.addEventListener('click', clickEventHander)` need to be typed `(e: MouseEvent) => void`.

And the two aren't compatible. Which is a bit annoying as I've sometimes tried to use the same click event handler in both ways.

More investigation needed.

### Using the `Modal` component

1. The Modal component is stateless. The `modalVisible` state, and the event listeners and handlers, are in the component/page that uses the Modal instance.
   * This is because the button triggering the display of the Modal instance is on that page, so the click event can't be handled downstream.

2. An `id` is created and assigned to the main modal heading. The Modal component will use this to label the `role='dialog'` div with that label

3. This heading `id` is passed to the `idOfMainHeadingOrAccessibleNameForTheModal` prop, and the Modal instance will use it to set `aria-describedby` on the `role='dialog'` div, which requires an accessible name for the role to be announced. 
   * As a fallback, that prop can take another string, that'll be used to set `aria-label` on the `role='dialog'` div

4. The consuming component, because it is in charge of the event handlers, needs to know the `id` of the `div` containing the modal content, so that, when a click is detected on `document`, the consuming component can determine whether the click was inside or outside the modal content, and close the modal in the later case.
To make this happen, we create the `id` for that `div` (containing the modal content) inside the consuming component, and pass that `id` as a prop to the Modal instance

5. When it has just mounted, before redirecting focus, the Modal instance will record the `document.activeElement`, and will then return focus to is as it's about to unmount, if that same element is still in the DOM. 
If that element is not in the DOM anymore, we can provide the `id` of another element that the focus should be redirected to instead

```tsx
export const PageWithAModalButton: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false); /* 1 */

  const idForModalHeader= 'modalHeader' + idGenerator.generate(); /* 2 */
  const idForModalContainer = 'modalContainer'+ idGenerator.generate(); /* 4 */

  useEffect(() => {
    document.addEventListener('keyup', handleEscapeKeyup); /* 1 */
    document.addEventListener('click', handleClickAnywhereOutsideModal); /* 1 */

    function handleClickAnywhereOutsideModal (e: MouseEvent) { /* 1 */
      if (!modalVisible) { return }

      const $modalContainer = document.getElementById(idForModalContainer); /* 4 */
      if (!$modalContainer) { return }
  
      if (!$modalContainer.contains(e.target as HTMLElement)) { /* 4 */
        setModalVisible(false);
        e.stopPropagation();
      }
    }

    return function cleanup() {
      document.removeEventListener('keyup', handleEscapeKeyup);
      document.removeEventListener('click', handleClickAnywhereOutsideModal);
    }
  }, [modalVisible, idForModalContainer]);

  function handleModalTriggerClick (e: React.MouseEvent) { /* 1 */
    setModalVisible(true);
    e.stopPropagation();
  };

  function handleModalCloseClick(e: React.MouseEvent) { /* 1 */
    setModalVisible(false);
    e.stopPropagation();
  };

  function handleEscapeKeyup (e: KeyboardEvent) { /* 1 */
    if (e.key === 'Escape') {
      setModalVisible(false)
      e.stopPropagation();
    }
  }

  return (
    <div>
      <h1 id="welcome_header">Welcome to our site</h1>

      <button onClick={handleModalTriggerClick}>Trigger modal</button>

      {modalVisible && /* 1 */
        <Modal
        idOfModalContentContainer={idForModalContainer} /* 4 */
        idOfMainHeaderOrAccessibleNameForTheModal={idForModalHeader} // 3: If the string is not the id of an element inside the modal, it gets used as `aria-label`
        idOfElementToFocusWhenModalClosesIfTriggeringButtonIsNotInDomAnyMore={'welcome_header'} // 5 This prop is unnecessary in this use case here, and is just included for demo
        >
          <button onClick={handleModalCloseClick}>Close</button>

          <h1 id={idForModalHeader}>Check out our offers now!</h1>

          <p>Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</p>
        </Modal>
      }
    </div>
  );
}
```

### Creating a Modal component in React

```tsx
type Props = {
  children: React.ReactNode
  idOfModalContentContainer: string /* Because state is managed by the React parent component, the parent needs to know this id when listening to `click` events on document and detecting whether the `e.target` was inside or outside the modal content container */
  idOfMainHeadingOrAccessibleNameForTheModal: string
  idOfElementToFocusWhenModalClosesIfTriggeringButtonIsNotInDomAnyMore?: string
}

export const Modal: React.FC<Props> = ({
  children,
  idOfModalContentContainer,
  idOfMainHeadingOrAccessibleNameForTheModal,
  idOfElementToFocusWhenModalClosesIfTriggeringButtonIsNotInDomAnyMore,
}) => {

  const modalContentContainerRef = useRef<HTMLDivElement>(null);

  const $portalTarget = document.createElement('div');
  
  useEffect(() => {
    const $triggeringButton = document.activeElement as HTMLElement;
    
    const childrenOfBodyElement = Array.from(document.body.children);
    childrenOfBodyElement.forEach(_ => _.setAttribute('inert', ''));
    
    document.body.appendChild($portalTarget);
    if (modalContentContainerRef.current) { modalContentContainerRef.current.focus(); }

    if (modalContentContainerRef.current) {
      const $mainModalHeader = modalContentContainerRef.current.querySelector(`#${idOfMainHeadingOrAccessibleNameForTheModal}`);

      if ($mainModalHeader) {
        modalContentContainerRef.current.setAttribute('aria-labelledby', idOfMainHeadingOrAccessibleNameForTheModal);

      } else {
        modalContentContainerRef.current.setAttribute('aria-label', idOfMainHeadingOrAccessibleNameForTheModal);
      }
    }

    return function cleanup() {
      document.body.removeChild($portalTarget);
      childrenOfBodyElement.forEach(_ => _.removeAttribute('inert'));

      if ($triggeringButton && document.body.contains($triggeringButton)) { /* Check whether the element that was focused before the modal appeared is still in the DOM */
        $triggeringButton.focus();
      } else {

        if (idOfElementToFocusWhenModalClosesIfTriggeringButtonIsNotInDomAnyMore) {
          const elementToFocus = document.getElementById(idOfElementToFocusWhenModalClosesIfTriggeringButtonIsNotInDomAnyMore);

          if (elementToFocus) {
            if (elementToFocus.tabIndex !== 0) { /* Make sure that the element that will receive focus can receive focus, without overriding any `tabIndex='0'` */
              elementToFocus.tabIndex = -1
            }

            elementToFocus.focus();
          }
        }
      }
    }
  }, [
    $portalTarget,
    idOfElementToFocusWhenModalClosesIfTriggeringButtonIsNotInDomAnyMore,
    idOfMainHeadingOrAccessibleNameForTheModal
  ]);

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
}
```

#### Styling a Modal component

```scss

.Modal__backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
}

.Modal__content_container {
    position: fixed;
    width: max-content;
    max-width: 80%;
    max-height: 60%;
    overflow-y: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 1rem;
}
```
