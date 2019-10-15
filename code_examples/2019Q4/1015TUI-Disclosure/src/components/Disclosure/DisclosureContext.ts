import { createContext} from 'react';

type ContextValue = {
  expanded: boolean
  toggleDisclosureVisibility: () => void
}

export const DisclosureContext = createContext<ContextValue>({
  expanded: false,
  toggleDisclosureVisibility: () => {},
});
