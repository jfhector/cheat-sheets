# Getting data from HTML to CSS

## `attr`

### Example

E.g. This is how to show links' urls for print styles:

```css
a.generated::after {
    content: " ( " attr(href)  ") ";
}
```