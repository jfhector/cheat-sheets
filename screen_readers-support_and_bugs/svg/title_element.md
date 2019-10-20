# SVG `title` element

## Support issue

While a `<title>` provides the equivalent of alternative text for SVG, the unfortunate reality is that not all browsers expose this information through the Accessible API. Furthermore, not all screen readers actually make use of it. 

Deque WAS course Oct 2019

### Solution

Exposure to screen readers can be drastically increased by simply adding the aria-labelledby attribute in the `<svg>` tag and then tying it directly to the `<title>`

```html
<svg role="img" aria-labelledby="widgetSales">
  <title id="widgetSales">Total Widgets Purchased during 2016</title>
  ...
</svg>
```