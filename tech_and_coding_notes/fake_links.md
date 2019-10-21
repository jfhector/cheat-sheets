# Functional fake links using ARIA

```html
/* the jQuery click() event can be activated by mouse or keyboard */
$("[role=link]").click(function(){
   var href = $(this).attr('data-href');
   window.open(href);
});
/* Note: if you don't want the link to open in a new window,
use document.location = href;
instead of window.open(href) */
```

Note: this works because jQuery's `click` function supports both mouse and keyboard. If I'm not using jQuery, I should implement a keyboard event handler.

css```
[role=link] {color: blue; text-decoration: underline;}
[role=link]:hover {cursor:pointer;}
```