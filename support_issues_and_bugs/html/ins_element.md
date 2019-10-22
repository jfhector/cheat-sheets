# HTML `ins` element

## Issue

Screen readers do not support the <ins> element. They read the text, but do not notify users that the text has been inserted.

## Solution

Critical text designated for insertion MUST be supplemented with a text-based method to convey the meaning of the insertion.

```html
<p>If you can't say something nice, don't say 
  <del>
  <span class="visually-hidden">begin deleted text</span>
    nothing
  <span class="visually-hidden">end deleted text</span>
  </del> 
  <ins>
  <span class="visually-hidden">begin inserted text</span>
    anything
  <span class="visually-hidden">end inserted text</span>
  </ins>
  at all.
</p>
```
