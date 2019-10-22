# Mark element

## Issue

Even though the <mark> element is semantically-correct, current screen readers do not notify users that a <mark> element is present, so there is no benefit to screen reader users (even though sighted users still benefit, because of the visual background color highlighting). That said, the <mark> element is still the best choice because that tag conveys the intended purpose (to mark something as highlighted).

Deque WAS course

## Solution

Critical highlighted text SHOULD be supplemented with a text-based method to convey the meaning of the highlighting.

```html
<p>The woman <mark>
  <span class="visually-hidden">begin highlight</span>
    threw
  <span class="visually-hidden">end highlight</span>
  </mark> the Frisbee.</p>
<p>(The verb is "threw.")</p>
```