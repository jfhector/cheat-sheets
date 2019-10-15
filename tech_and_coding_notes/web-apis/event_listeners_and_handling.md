# Event listeners and handling

## Lessons

### Detecting `click` events outside an element, and using this to dismiss a dialog

See [example](./../../code_examples/2019Q4/1014-Modal_React_Component/README.md).

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