# Text inside inline svg

## If the svg element doesn't have a `title` , or doesn't have `role="img"`

See [example](https://codesandbox.io/s/1019dwas-textinsvg-r67mz?fontsize=14).

If you don't add `<title>` or role="img" to an `<svg>` element, some screen readers will ignore the fact that it is `<svg>` and instead just read the text within it.

That sounds like a good thing, and in some ways, it is, but there are drawbacks.

Screen reader behavior is not uniform across the different brands, so the end result is not consistently accessible that way.

Also, the `<title>` element is essentially a requirement, but won't be recognized by all screen readers unless you also add role="img". Once you add both `<title>` and role="img", the behavior of screen readers changes. Instead of treating the `<text>` element as text, screen readers treat the `<svg>` element as an image, and they ignore the `<text>` element inside.

## If the svg element has a `title` , or `role="img"`

... then text inside it doesn't get read.

