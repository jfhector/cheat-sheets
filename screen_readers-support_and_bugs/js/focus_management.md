# Screen reader support / bugs related to focus management

## Issue: Screen readers (especially VoiceOver on iOS) may lose the focus if the focus is sent too soon to an element that have just been added to the DOM

VoiceOver on iOS is particularly prone to losing the focus on AJAX content if the focus is sent too soon.

Deque WAS course Nov 2019

### Solution: Send focus to newly inserted DOM elements after a 1 second delay

A good delay duration is typically about 1 second, but you should test your script to ensure the delay you have chosen is sufficient. Most screen readers can tolerate much shorter delays, but iOS cannot (unless/until they fix it).

## Issue: VoiceOver won't read the text of an element the focus is sent to, if that element was the last active element

If the focus is already on the element where the focus will be sent, some screen readers (VoiceOver on macOS in particular) will not read the text in the element, even if the text in the element has changed.

Deque WAS course Nov 2019

### Solution: The focus MUST be temporarily moved, then sent to the correct destination.

One of the easiest ways to fix this is to temporarily send the focus to an empty container, then send it to the desired destination. Not all screen readers require the temporary focus trick, but it is a requirement (at least for now) if you plan to support VoiceOver and Safari.

```js
$(document).on('click', 'a', function (e) {  
  /* Don't let links act like regular links */
  e.preventDefault();

  /* Run functions that do the following:
    - empty the containers that the AJAX content will fill
    - load the AJAX content
    - update the document with the AJAX content
    - update the browser history
    - send the focus temporarily to an empty container
    - send the focus to the desired destination after a delay
  */
});
```