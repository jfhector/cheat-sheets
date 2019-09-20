# 0904CID_Photography-portfolio

[See it live](https://jfhector.github.io/cheat-sheets/code_examples/2019Q4/0904CID_Photography-portfolio/index.html)

## Snapshots

<figure>
  <figcaption>Large viewport in Firefox</figcaption>
  <img src="./snapshots/s01.png">
</figure>

<figure>
  <figcaption>Medium viewport in Firefox</figcaption>
  <img src="./snapshots/s02.png">
</figure>

<figure>
  <figcaption>Small viewport in Firefox</figcaption>
  <img src="./snapshots/s03.png">
</figure>

<figure>
  <figcaption>Viewed in Chrome (bug/support issue)</figcaption>
  <img src="./snapshots/s04.png">
</figure>

<figure>
  <figcaption>Viewed in Safari (bug/support issue)</figcaption>
  <img src="./snapshots/s05.png">
</figure>

## What does it demonstrate?

* `grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));`
* `grid-auto-rows: 1fr;`
* `grid-auto-flow: dense;`
* `img { max-width: 100%; height: 100%; object-fit: cover; }`
* `.portfolio > figure.featured { grid-column: span 2; grid-row: span 2; }`


## Notes

### Bug / support issues

* If the tallest image image in a row stretches a grid row tall, AND the height of that image is set to 100%, the grid layout bugs in Chrome and Safari
