import React, { useState } from 'react';
import { DisclosureContext } from './DisclosureContext';

type Props = {
  expandedByDefault?: boolean
  children: React.ReactNode
}

export const Disclosure: React.FunctionComponent<Props> = ({
  expandedByDefault = false,
  children
}) => {

  const [expanded, setExpanded] = useState(expandedByDefault);

  function toggleDisclosureVisibility() {
    setExpanded(prevState => !prevState);
  };

  return (
    <DisclosureContext.Provider value={{ expanded, toggleDisclosureVisibility }}>
      {children}
    </DisclosureContext.Provider>
  );
};

export { DisclosureTrigger } from './DisclosureTrigger';
export { DisclosureTarget } from './DisclosureTarget';
