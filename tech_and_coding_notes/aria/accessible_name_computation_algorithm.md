# Accessible name computation algorithm

1. aria-labelledby
   If there is an aria-labelledby attribute, the text it refers to will override all other name and label methods.

2. aria-label
   If there is no aria-labelledby, the aria-label text string will override everything else. Note that the aria-label text is invisible, and only available to assistive technology users.

3. The native HTML text of the element (or native label or alternative text)
   If there is no aria-labelledby or aria-label, the native text of an element will be used (e.g. the text between the opening and closing `<button>` elements, the `<label>` text on a form field, the alt text of an image, etc.

4. title
   If no other naming methods are available, the title will count as the label. Note that the title is best considered as extra, non-essential information, because the title is not visible at all times and some users cannot access it at all, for example in browsers that show the title text only on mouse hover.
  