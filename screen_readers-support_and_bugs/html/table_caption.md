# Table caption

## Issue

Placing the visually-hidden class directly on the <caption> tag causes the NVDA screen reader to read the table with an incorrect number of rows.

### Correct implementation examples

#### Example: using a proper caption and visible text

```html
<table>
  <caption>1st Quarter Results</caption>
  ...
</table>
```

#### Example: using visually-hidden text

```html
<table>
  <caption><span class="visually-hidden">1st Quarter Results</span></caption>
  ...
</table>
```

#### Example: using `aria-label`

But `aria-label` values are not translated by most browsers. So using the other methods is better.

```html
<table aria-label="Second quarter Results">
  ...
</table>
```

#### Example: using `aria-labelledby`

```html
<h3 id="tableCaption">Third Quarter Results</h3>
<table aria-labelledby="tableCaption">
  ...
</table>
```
