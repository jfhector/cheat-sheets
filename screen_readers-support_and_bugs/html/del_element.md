# HTML `del` element

## Issue

Screen readers do not support the <del> element. They read the text, but do not notify users that the text has been deleted.

Deque WAS course

## Solution

Critical strikethrough text MUST be supplemented with a text-based method to convey the meaning of the strikethrough.

```html
<p>Price reduced! 
  <del>
  <span class="visually-hidden">Was</span>
    $100
  </del> 
  <ins>
  <span class="visually-hidden">now</span>
    $75!
  </ins>
</p>
```