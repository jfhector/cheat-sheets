# ARIA live regions

## Triggering announcements

### Updating a live region, without leaving a residue message in the DOM

See [example](./../../code_examples/2019Q4/1015TUI-SpinnerButton/README.md).

Considerations:
* To update a live region, it's better (for support, I believe) to first remove its content before adding new one.
But I can't add content immediately (synchronously) after I've deleting content, otherwise the fact that content was cleared won't be picked up. (At least, that's true if I'm re-adding the same content, which is a common use case).
* I believe that it's better to remove the content of a live region shortly after it's been populated, as screen reader users might come across that DOM element when navigating by element, and hear a status that might be irrelevant/confusing. But we can't remove the content of a live region right after having added it, otherwise the announcement doesn't get made. Removing the content after 500ms works (100ms is too short, I haven't tried other values).

So I follow these steps:
1. Cancel any setTimeout that might be running
2. Clear content in the live region
3. Use a setTimeout (with its id assigned to a variable called 'additionTimeout') to wait 100ms and add the new content
4. Within the callback of the addition setTimeout, use a removalSettimeout (with its id assigned to a variable called 'removalTimeout') to clear the content of the live region 500ms after I've populated it.
5. Clear both the addition and removal timeouts when the component is about to unmount

```tsx
type Props = {
  isBusy: boolean;
  // ...
  busyAnnouncement?: string;
  completeAnnouncement?: string;
  // ...
};

export const SpinnerButton: React.FunctionComponent<Props> = ({
  // ...
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

  // ...

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

      // ...
    </>
  );
};
```