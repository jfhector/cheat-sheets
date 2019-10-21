# Browser history

## Browser history management in AJAX apps

### Updating the browser history using `history.pushState`

```js
var newUrl = 'https://dequeuniversity.com';
var newTitle = 'Deque University';
history.pushState({
  url: newUrl,
  title: newTitle
}, newTitle, newUrl);
```

### Listen for `popState` events on the `window` object, and respond in an accessible way

The browser sends a popstate event when the "Back" or "Forward" buttons (or keyboard commands) are activated in the browser. You can intercept that event and apply the appropriate accessibility techniques.

```js
$(window).on('popstate', function (e) {
  var state = e.originalEvent.state;
  if (state !== null) {
    /* 
    Run functions that do the following:
    - empty the containers that the AJAX content will fill
    - load the AJAX content
    - update the document with the AJAX content
    - send the focus temporarily to an empty container
    - send the focus to the desired destination after a delay
    */
  } 
  else {
    /* 
    (optional conditions when a popstate
    is not activated)
    */
   } 
 });
```