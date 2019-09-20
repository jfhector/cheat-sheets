# 0906-auto-fit-or-fill-not-intrinsic-or-flexible-sizes

[See it live](https://jfhector.github.io/cheat-sheets/code_examples/2019Q4/0906-auto-fit-or-fill-not-intrinsic-or-flexible-sizes/index.html)

## Notes

* Auto-fit and auto-fill do not work with intrinsic or flexible sizes (e.g. `auto`, `max-content`). [See syntax of `repeat` in the CSS Grid specs](https://drafts.csswg.org/css-grid/#repeat-syntax).
  * This means that I might not be able to create an `auto-fit` grid where each element is as bit as its content. Use Flexbox instead
