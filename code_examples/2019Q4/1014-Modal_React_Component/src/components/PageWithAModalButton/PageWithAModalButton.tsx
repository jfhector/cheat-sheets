import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { idGenerator } from '../../utils/IDGenerator';

export const PageWithAModalButton: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const idForModalContainer = 'modalContainer'+ idGenerator.generate();
  const idForModalHeading= 'modalHeading' + idGenerator.generate();

  useEffect(() => {
    document.addEventListener('keyup', handleEscapeKeyup);
    document.addEventListener('click', handleClickAnywhereOutsideModal);

    function handleClickAnywhereOutsideModal (e: MouseEvent) {
      if (!modalVisible) { return }

      const $modalContainer = document.getElementById(idForModalContainer);
      if (!$modalContainer) { return }
  
      if (!$modalContainer.contains(e.target as HTMLElement)) {
        setModalVisible(false);
        e.stopPropagation();
      }
    }

    return function cleanup() {
      document.removeEventListener('keyup', handleEscapeKeyup);
      document.removeEventListener('click', handleClickAnywhereOutsideModal);
    }
  }, [modalVisible, idForModalContainer]);

  function handleModalTriggerClick (e: React.MouseEvent) { /* Note the type React.MouseEvent. MouseEvent on its own isn't compatible with `onClick` properties */
    setModalVisible(true);
    e.stopPropagation();
  };

  function handleModalCloseClick(e: React.MouseEvent) {
    setModalVisible(false);
    e.stopPropagation();
  };

  function handleEscapeKeyup (e: KeyboardEvent) { /* Note the type here. It's not a React type */
    if (e.key === 'Escape') {
      setModalVisible(false)
      e.stopPropagation();
    }
  }

  return (
    <div>
      <a href="https://www.github.com">Link to Github</a>

      <h1 id="welcome_header">Welcome to our site</h1>

      <button onClick={handleModalTriggerClick}>Trigger modal</button>

      {modalVisible &&
        <Modal
        idOfModalContentContainer={idForModalContainer}
        idOfMainHeadingOrAccessibleNameForTheModal={idForModalHeading} // If the string is not the id of an element inside the modal, it gets used as `aria-label`
        idOfElementToFocusWhenModalClosesIfTriggeringButtonIsNotInDomAnyMore={'welcome_header'} // This prop is unnecessary in this use case here, and is just included for demo
        >
          <button onClick={handleModalCloseClick}>Close</button>

          <h1 id={idForModalHeading}>Check out our offers now!</h1>

          <p>Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</p>
        </Modal>
      }

      <a href="https://www.tesco.com">Link to Tesco</a>
    </div>
  );
}