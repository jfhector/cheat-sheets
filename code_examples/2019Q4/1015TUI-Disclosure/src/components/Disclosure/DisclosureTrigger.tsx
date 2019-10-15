import React from 'react';
import { DisclosureContext } from './DisclosureContext';

type Props = {
  children: ((expanded: boolean) => React.ReactNode) | React.ReactNode
  [k: string]: unknown
}

export const DisclosureTrigger: React.FunctionComponent<Props> = (props) => {

  return (
    <DisclosureContext.Consumer>
      {
        ({ expanded, toggleDisclosureVisibility }) => (
          <button
          type='button'
          onClick={toggleDisclosureVisibility}
          aria-expanded={expanded}
          {...props}
          >
            { // Note: This way DisclosureTrigger accepts both some react content, or a function that returns some react content
              typeof props.children === 'function' ?
                (props.children as Function)(expanded) // TSC didn't automatically infer that props.children was a function
                : props.children
            }
          </button>
        )
      }
    </DisclosureContext.Consumer>
  );
}
