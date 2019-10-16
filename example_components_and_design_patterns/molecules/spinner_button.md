# Spinner Button

## Summary

## Master implementation: my own based on TenonUI, with some improvements

See [implementation](./../../code_examples/2019Q4/1015TUI-SpinnerButton/README.md).

### Testing status

Tested in MacOS Safari + Chrome + Vo, and NVDA + Chrome

* The component receives a `isBusy` prop. But this prop doesn't directly, immediately trigger rendering of the Spinner. What does is its `isSpinning` boolean state.
  * 100ms after `isBusy` becomes true, `isSpinning` becomes true. And conversely for false. This is to introduce throttling and avoid having more than 3 flashes per second.

* The component receives `busyAnnouncement` and `completeAnnouncement` props (with defaults set in the component. These provide the content of the announcements of a live (`role='status'`) region.
* What triggers the announcement, is a `liveAnnouncement` string piece of state that populates the live region, and gets updated.
* `liveAnnouncement` gets updated with `busyAnnouncement`, `completeAnnouncement` or `''` depending on the changes of the `isBusy` prop, but following a algorithm so that:
  * `liveAnnouncement` always gets cleared before it gets repopulated again, 100ms later
  * any scheduled clearing and repopulating of `liveAnnouncement` gets cancelled if whenever the next ones are getting scheduled (before `isBusy` has changed again, for example)
  * the content of `liveAnnouncement` gets cleared 500ms after being populated, to not polute the DOM

For more details on how this is done, see the example page and related notes.

```tsx
import React, { useState, useEffect } from "react";
import { Spinner } from "./../Spinner/Spinner";
import "./SpinnerButton.css";

type ReplacementClassNames = {
  forButton: string;
  forSpinner: string;
};

type Props = {
  isBusy: boolean;
  onClick: (e: React.MouseEvent) => void;
  onBusyClick?: (e: React.MouseEvent) => void;
  busyAnnouncement?: string;
  completeAnnouncement?: string;
  replacementClassNames?: ReplacementClassNames;
  children: React.ReactNode;
};

export const SpinnerButton: React.FunctionComponent<Props> = ({
  isBusy,
  onClick,
  onBusyClick,
  busyAnnouncement = "App busy",
  completeAnnouncement = "Action complete",
  replacementClassNames,
  children,
  ...rest
}) => {
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  useEffect(() => {
    let additionTimeoutId: number | undefined;
    let removalTimeoutId: number | undefined;

    // When isBusy has become true
    if (isBusy) {
      // Clear the timeout so that the scheduled 'is complete' announcement gets cancelled
      // Empty the live region, so that new additions (with a 100ms buffer) will be well registered.
      clearTimeout(additionTimeoutId);
      clearTimeout(removalTimeoutId);
      setLiveAnnouncement("");

      additionTimeoutId = setTimeout(() => {
        // trigger the isSpinning state after 100ms to avoid excessive flashes on repeat updates
        setIsSpinning(true);
        setLiveAnnouncement(busyAnnouncement);

        // setLiveAnnouncement(""); /Gotcha: Do not empty a live region right after (synchronously) having populated it, as the announcement wouldn't get made/
        /* Instead, I empty the live region after a time out of 500ms */
        removalTimeoutId = setTimeout(() => {
          setLiveAnnouncement("");
        }, 500);
      }, 100);

      // When isBusy has become false, if the spinner is spinning. (I'm adding this extra guard so that the code block doesn't run on initial page load)
    } else if (isSpinning !== false) {
      // Clear the timeout so that the scheduled 'is busy' announcement gets cancelled
      // Empty the live region, so that new additions (with a 100ms buffer) will be well registered.
      clearTimeout(additionTimeoutId);
      clearTimeout(removalTimeoutId);
      setLiveAnnouncement("");

      additionTimeoutId = setTimeout(() => {
        // trigger the isSpinning state after 100ms to avoid excessive flashes on repeat updates
        setIsSpinning(false);
        setLiveAnnouncement(completeAnnouncement);

        // setLiveAnnouncement(""); /Gotcha: Do not empty a live region right after (synchronously) having populated it, as the announcement wouldn't get made/
        removalTimeoutId = setTimeout(() => {
          /* Instead, I empty the live region after a time out of 500ms */
          setLiveAnnouncement("");
        }, 500);
      }, 100);
    }

    return function cleanup() {
      clearTimeout(additionTimeoutId);
      clearTimeout(removalTimeoutId);
    };
  }, [
    isBusy,
    busyAnnouncement,
    completeAnnouncement,
    liveAnnouncement,
    isSpinning
  ]);

  const handleClick = isBusy ? onBusyClick : onClick;

  return (
    <>
      <div
        className="!visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="additions"
      >
        {liveAnnouncement}
      </div>

      <button
        className={
          (replacementClassNames && replacementClassNames.forButton) ||
          "SpinnerButton"
        }
        onClick={handleClick}
        {...rest}
      >
        {children}

        {isSpinning && (
          <Spinner
            title=""
            replacementClassName={
              (replacementClassNames && replacementClassNames.forSpinner) ||
              "SpinnerButton__spinner"
            }
          />
        )}
      </button>
    </>
  );
};
```

#### Styling it

```css
.SpinnerButton {
  background-color: blue;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  padding: 1rem 1.2rem;
  margin: 1rem;
  color: white;
  border-radius: 0.3rem;
}

.SpinnerButton__spinner {
  width: 1.5rem; /* It's only once I had set a width on the svg element that it displayed to the right on the text content */
  height: 1.5rem;
  color: white;
  vertical-align: middle;
  margin-left: 0.8rem;
  margin-top: -0.8rem;
  margin-bottom: -0.8rem; /* I'm using negative margins because the spinner is taller than the text. And I don't want the height of the button to increase*/
}
```