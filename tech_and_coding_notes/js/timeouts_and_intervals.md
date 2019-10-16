# JS timeouts and intervals

## setTimeout and clearTimeout

### Cancelling scheduled timeouts, inc on cleanup

See [example](./../../code_examples/2019Q4/1015TUI-SpinnerButton/README.md).

If I'm using `setTimeout` to schedule an action, the schedule should be cancelled if it becomes irrelevant, and also when the component dismounts.

```tsx
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
```