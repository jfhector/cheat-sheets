# Search

## Summary

* Be careful to not apply `role="search"` to the input element, as this would override the element's needed semantics (it needs to be announced as an editable text field). Instead, add `role="search"` to the wrapping form element.
* For the `input` element, using `type="text"` or `type="search"` both have pros and cons:
  * `type="search"` produces customised keyboards on mobile browsers
  * ... but `type="search"` produces slightly redundant and slightly unclear screen reader announcements (assuming it is inside a `role="search"` landmark region, as it should be)
    * "Search region, Search for..., search"
    * vs "Search region, Search for..., edit text."

## Master implementation: Scott O'Hara's implementation

https://scottaohara.github.io/a11y_styled_form_controls/src/search/

