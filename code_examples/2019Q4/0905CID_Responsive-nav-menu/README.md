# 0905CID_Responsive-nav-menu

[See it live](https://jfhector.github.io/cheat-sheets/code_examples/2019Q4/0905CID_Responsive-nav-menu/index.html)

## Snapshots

<figure>
  <figcaption>Snapshot of UI on large viewport, showing nav menu</figcaption>
  <img src="./snapshots/s01.png">
</figure>

<figure>
  <figcaption>Snapshot of UI on smaller viewport, showing nav menu</figcaption>
  <img src="./snapshots/s02.png">
</figure>

<figure>
  <figcaption>Snapshot of UI on small, hiding nav menu and showing menu button</figcaption>
  <img src="./snapshots/s03.png">
</figure>

<figure>
  <figcaption>Snapshot of UI on small, once the menu button is clicked, showing the nav menu stacked vertically</figcaption>
  <img src="./snapshots/s04.png">
</figure>

## What does it demonstrate?

### Media queries and CSS specificity
 
Note: if I didn't have a `nav-items` class in the selector inside the media query, I'd have a specificity problem. 
Because the `.is-open` class and `:not(is-open)` pseudo-class would have forced the value of display to none or block, taking precedence over `display: flex` in the media query.

```
nav > ul.is-open {
    display: block;
}

nav > ul:not(.is-open) {
    display: none;
}

@media screen and (min-width: 21em) {
    nav > ul.nav-items {
        display: flex;
    }

    ...
}
```

### Using negative margin on a container to add margin between items but not around them.

Heydon Pickering's 'Cluster' layout promitive

```
.row {
    display: flex;
    margin-left: -0.5em;
    margin-right: -0.5em;
}

.column {
    flex: 1;
    margin-left: 0.5em;
    margin-right: 0.5em;
}
```

### Laying out elements as a row above a certain min-width (and as a column below) using a media query

Heydon Pickering's 'Switcher' layout primitive does the same thing without a media query

```
@media screen and (min-width: 38em) {
    .row {
        display: flex;
        margin-left: -0.5em;
        margin-right: -0.5em;
    }

    .row > div {
        flex: 1;
        margin-left: 0.5em;
        margin-right: 0.5em;
    }
}
```

### Background image

```
.hero-image {
    min-height: 12em;
    background-image: url(https://cdn.images.express.co.uk/img/dynamic/galleries/x701/120211.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    padding: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

## Notes

* Media queries don't change CSS specificity. If I want the rulesets inside my media queries to override those outside, I need to be careful that they have as much specificity.

