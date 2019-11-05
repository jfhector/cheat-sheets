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

### Using `setTimeout(fn, 0)`

When trying to use https://github.com/WICG/inert as the inert polyfill, I found that setting focus after closing the modal was not working because inert was not really removed yet when focus was being set. Here's a quote from the wing-inert README about the issue:

> It relies on mutation observers to detect the addition of the inert
attribute, and to detect dynamically added content within inert subtrees.
Testing for inert-ness in any way immediately after either type of mutation
will therefore give inconsistent results; please allow the current task to end
before relying on mutation-related changes to take effect, for example via
setTimeout(fn, 0) or Promise.resolve().

So I recommended:

> I think that setTimeout(fn, 0) should work.
The first answer to this Stack Overflow question explains what the technique does:
https://stackoverflow.com/questions/33955650/what-is-settimeout-doing-when-set-to-0-milliseconds/33955673

Ptrin tested and it worked just as well:

https://github.com/scottaohara/accessible_modal_window/pull/11