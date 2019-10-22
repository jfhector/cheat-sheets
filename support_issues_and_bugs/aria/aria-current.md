# aria-current

## Issue

Deque WAS course: "In ARIA 1.1 there is a proposed attribute of aria-current (see https://www.w3.org/TR/wai-aria-1.1/#aria-current opens in a new window), but the attribute is not official yet, and is not yet supported by browsers or assistive technologies."

## Strategy

### Have to resort to techniques such as:

* Visually hidden text
* aria-describedby
* aria-label
* aria-labelledby

#### Example

```html
<nav>
  <ul>
    <li><a href="#">Fruits</a></li>
    <li><a href="#">Vegetables</a></li>
    <li><a href="#">Meats</a></li>
    <li class="current-page">
      <span class="visually-hidden">Current page: </span>Dairy
    </li>
    <li><a href="#">Breads, Pasta, & Cereals</a></li>
    <li><a href="#">Soups & Canned Goods</a></li>
    <li><a href="#">Frozen Foods</a></li>
    <li><a href="#">Desserts</a></li>
    <li><a href="#">Snack Foods</a></li>
  </ul>
</nav>
```
