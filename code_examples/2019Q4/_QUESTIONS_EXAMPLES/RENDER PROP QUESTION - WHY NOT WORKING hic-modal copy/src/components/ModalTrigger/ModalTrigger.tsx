import React, { useEffect, useRef, useState } from 'react';
import './ModalTrigger.scss';
import ReactDOM from 'react-dom';

type Props = {
  render: (fn: (e: React.MouseEvent) => void) => React.ReactNode
  modalContent: React.ReactNode
  closeButtonClassName?: string
}

export const ModalTrigger: React.FC<Props> = ({
  render,
  modalContent,
  closeButtonClassName = '',
}) => {

  const [modalVisible, setModalVisible] = useState(false);

  const modalContentContainerRef = useRef<HTMLDivElement>(null);

  const $modalContainer = document.createElement('div');
  
  useEffect(() => {
    const $triggeringButton = document.activeElement as HTMLElement | null;
    
    const childrenOfBodyElement = Array.from(document.body.children);
    childrenOfBodyElement.forEach(_ => _.setAttribute('inert', ''));
    
    document.body.appendChild($modalContainer);
    if (modalContentContainerRef.current) { modalContentContainerRef.current.focus(); }

    return function cleanup() {
      document.body.removeChild($modalContainer);
      childrenOfBodyElement.forEach(_ => _.removeAttribute('inert'));
      if ($triggeringButton) { $triggeringButton.focus(); }
    }
  }, [$modalContainer]);

  useEffect(() => {
    document.addEventListener('keyup', handleEscapeKeyup);
    document.addEventListener('click', handleClickAnywhereOutsideModal);

    return function cleanup() {
      document.removeEventListener('keyup', handleEscapeKeyup);
      document.removeEventListener('click', handleClickAnywhereOutsideModal);
    }
  });

  function handleModalTriggerClick (e: React.MouseEvent) { /* Note the type React.MouseEvent. MouseEvent on its own isn't compatible with `onClick` properties */
    debugger;

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

  function handleClickAnywhereOutsideModal (e: MouseEvent) {
    if (!modalContentContainerRef.current) { return }

    if (modalVisible && !modalContentContainerRef.current.contains(e.target as HTMLElement)) {
      setModalVisible(false);
      e.stopPropagation();
    }
  }

  return (
    <>
      {
        render(handleModalTriggerClick)
      }

      {
        modalVisible && ReactDOM.createPortal(
          <>
            <div className='Modal__backdrop'></div>
            
            <div
            ref={modalContentContainerRef}
            className="Modal__content_container"
            tabIndex={-1}
            role='dialog'
            aria-modal={true}
            >
              <>
                <button type='button' className={closeButtonClassName} onClick={handleModalCloseClick}>Close</button>

                {modalContent}
              </>
            </div>
          </>,
          $modalContainer
        )
      }
    </>
  );
}

    // var idOfFirstH1InModal: string | undefined;
    // const firstH1InModal = $modalContainer.getElementsByTagName('h1')[0]; /* Doing this inside useEffect, as otherwise I believe the modal container wouldn't have been populated yet */
    // if (firstH1InModal) {
    //   idOfFirstH1InModal = firstH1InModal.id ? firstH1InModal.id : firstH1InModal.id = idGenerator.generate();
      
    //   if (modalContentContainerRef.current) {
    //     modalContentContainerRef.current.setAttribute('aria-labelledby', idOfFirstH1InModal); // Note: If I do this in `render`, the value of `idOfFirstH1InModal` is undefined. This is probably because, to do that, I need to declare `idOfFirstH1InModal` outside `useEffect`, and hence its value isn't preserced across `useEffect` calls
    //   }
    // }