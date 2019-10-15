import React from 'react';
import { DisclosureContext } from './DisclosureContext';

type Props = {
  children: React.ReactNode
  [k: string]: unknown
}

export const DisclosureTarget: React.FunctionComponent<Props> = (props) => {

  return (
    <DisclosureContext.Consumer>
      {
        ({ expanded }) => (
          <>
            {expanded && props.children}
          </>
        )
      }
    </DisclosureContext.Consumer>
  );
}
