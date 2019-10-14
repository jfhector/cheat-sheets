import React, { useEffect, useRef } from 'react';
import './Modal.scss';
import ReactDOM from 'react-dom';

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
