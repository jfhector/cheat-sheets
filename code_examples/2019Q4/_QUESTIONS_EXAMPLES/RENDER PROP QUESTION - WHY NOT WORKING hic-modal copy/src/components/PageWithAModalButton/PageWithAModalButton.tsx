import React from 'react';
import { ModalTrigger } from '../ModalTrigger/ModalTrigger';

export const PageWithAModalButton: React.FC = () => {

  return (
    <div>
      <ModalTrigger 
      render={modalTriggerClickHandler => <button onClick={modalTriggerClickHandler}>Trigger modal</button>}
      modalContent={
        <>
          <h1>I'm the heading!</h1>

          <p>Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</p>
        </>
      }
      />
    </div>
  );
}
